import { v4 as uuidv4 } from 'uuid';

export class Contact {
    public constructor(
        private phone: string,
        private email: string,
        private message: string,
        private id: string = uuidv4(),
        private createdAt: Date = new Date()
    ) {}

    public getId(): string {
        return this.id;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getEmail(): string {
        return this.email;
    }

    public getMessage(): string {
        return this.message;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

}