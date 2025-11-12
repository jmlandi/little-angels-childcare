#!/bin/bash

# Deploy script for Little Angels Childcare
# This script creates a backup before deploying updates

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${SCRIPT_DIR}/little-angels-childcare"
BACKUP_DIR="${SCRIPT_DIR}/backup"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="little-angels-backup-${TIMESTAMP}"
DEPLOY_STATE_DIR="${PROJECT_DIR}/.deploy"

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Little Angels Childcare Deployment${NC}"
echo -e "${GREEN}======================================${NC}"

# Create backup directory if it doesn't exist
echo -e "${YELLOW}Creating backup directory...${NC}"
mkdir -p "${BACKUP_DIR}"

# Backup database (if using Docker)
echo -e "${YELLOW}Backing up database...${NC}"
if [ -f "${PROJECT_DIR}/docker-compose.yml" ]; then
    docker-compose -f "${PROJECT_DIR}/docker-compose.yml" exec -T postgres pg_dump -U postgres little_angels > "${BACKUP_DIR}/${BACKUP_NAME}.sql" 2>/dev/null || {
        echo -e "${YELLOW}Database backup skipped (container might not be running)${NC}"
    }
fi

# Backup project files
echo -e "${YELLOW}Backing up project files...${NC}"
tar -czf "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    -C "$(dirname ${PROJECT_DIR})" \
    "$(basename ${PROJECT_DIR})" 2>/dev/null || {
    echo -e "${RED}Warning: File backup encountered issues${NC}"
}

echo -e "${GREEN}✓ Backup completed: ${BACKUP_NAME}${NC}"

# Update code from repository
echo -e "${YELLOW}Updating code from repository...${NC}"
cd "${PROJECT_DIR}"

# Stash any local changes
git stash save "Auto-stash before deployment ${TIMESTAMP}" 2>/dev/null || true

# Pull latest changes
git pull origin main || {
    echo -e "${RED}Error: Git pull failed${NC}"
    exit 1
}

echo -e "${GREEN}✓ Code updated successfully${NC}"
# Prepare deploy state dir
mkdir -p "${DEPLOY_STATE_DIR}"

# Decide whether we need to (re)install dependencies
LOCK_FILE="${PROJECT_DIR}/package-lock.json"
PREV_LOCK_HASH_FILE="${DEPLOY_STATE_DIR}/lock.hash"

hash_file() {
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum "$1" | awk '{print $1}'
    else
        shasum -a 256 "$1" | awk '{print $1}'
    fi
}

NEED_INSTALL=1
if [ "${FORCE_INSTALL:-0}" = "1" ]; then
    echo -e "${YELLOW}FORCE_INSTALL is set. Will reinstall dependencies.${NC}"
else
    if [ -f "${LOCK_FILE}" ]; then
        CURRENT_LOCK_HASH=$(hash_file "${LOCK_FILE}")
    else
        CURRENT_LOCK_HASH=""
    fi

    if [ -d "${PROJECT_DIR}/node_modules" ] && \
         [ -f "${PREV_LOCK_HASH_FILE}" ] && \
         [ -n "${CURRENT_LOCK_HASH}" ] && \
         [ "$(cat "${PREV_LOCK_HASH_FILE}")" = "${CURRENT_LOCK_HASH}" ]; then
        echo -e "${YELLOW}Lockfile unchanged and node_modules present. Skipping dependency install.${NC}"
        NEED_INSTALL=0
    else
        echo -e "${YELLOW}Lockfile changed or node_modules missing. Installing dependencies...${NC}"
    fi
fi

if [ "${NEED_INSTALL}" -eq 1 ]; then
    echo -e "${YELLOW}Cleaning node_modules...${NC}"
    rm -rf node_modules

    echo -e "${YELLOW}Installing dependencies (npm ci)...${NC}"
    START_TS=$(date +%s)
    NPM_CONFIG_FUND=false NPM_CONFIG_AUDIT=false npm ci --prefer-offline || {
            echo -e "${RED}Error: npm ci failed${NC}"
            exit 1
    }
    END_TS=$(date +%s)
    echo -e "${GREEN}✓ Dependencies installed in $((END_TS-START_TS))s${NC}"

    # Record current lockfile hash for next deploy
    if [ -n "${CURRENT_LOCK_HASH}" ]; then
        echo "${CURRENT_LOCK_HASH}" > "${PREV_LOCK_HASH_FILE}"
    fi
fi

echo -e "${YELLOW}Building application...${NC}"
npm run build || {
    echo -e "${RED}Error: Build failed${NC}"
    exit 1
}

echo -e "${GREEN}✓ Build completed successfully${NC}"

# Restart services
echo -e "${YELLOW}Restarting services...${NC}"
if [ -f "${PROJECT_DIR}/docker-compose.yml" ]; then
    cd "${PROJECT_DIR}"
    docker-compose down && docker-compose up -d --build
    echo -e "${GREEN}✓ Docker services restarted${NC}"
else
    # If using PM2 or systemd
    if command -v pm2 &> /dev/null; then
        pm2 restart all || pm2 start npm --name "little-angels" -- start
        echo -e "${GREEN}✓ PM2 services restarted${NC}"
    else
        echo -e "${YELLOW}Please restart your services manually${NC}"
    fi
fi

# Cleanup old backups (keep last 10)
echo -e "${YELLOW}Cleaning up old backups...${NC}"
ls -t "${BACKUP_DIR}"/little-angels-backup-*.tar.gz 2>/dev/null | tail -n +11 | xargs -r rm
ls -t "${BACKUP_DIR}"/little-angels-backup-*.sql 2>/dev/null | tail -n +11 | xargs -r rm

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}======================================${NC}"
echo -e "Backup location: ${BACKUP_DIR}/${BACKUP_NAME}"
