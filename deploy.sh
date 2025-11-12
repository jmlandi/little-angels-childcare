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
