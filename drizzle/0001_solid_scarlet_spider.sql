CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`adminId` int NOT NULL,
	`action` varchar(100) NOT NULL,
	`entityType` varchar(50) NOT NULL,
	`entityId` int,
	`changes` text,
	`reason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('application_status','new_opportunity','training_reminder','program_update','system') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`relatedEntityType` varchar(50),
	`relatedEntityId` int,
	`isRead` boolean NOT NULL DEFAULT false,
	`emailSent` boolean NOT NULL DEFAULT false,
	`emailSentAt` datetime,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `opportunities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`type` enum('job','internship','scholarship','event') NOT NULL,
	`domain` varchar(100),
	`region` varchar(100),
	`organization` varchar(255),
	`organizationLogo` text,
	`salary` varchar(100),
	`duration` varchar(100),
	`applicationDeadline` datetime,
	`startDate` datetime,
	`endDate` datetime,
	`requirements` text,
	`benefits` text,
	`contactEmail` varchar(320),
	`contactPhone` varchar(20),
	`applicationUrl` text,
	`imageUrl` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `opportunities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `opportunity_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`opportunityId` int NOT NULL,
	`status` enum('applied','shortlisted','rejected','accepted','withdrawn') NOT NULL DEFAULT 'applied',
	`applicationDate` timestamp NOT NULL DEFAULT (now()),
	`resumeUrl` text,
	`coverLetter` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `opportunity_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `program_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`programId` int NOT NULL,
	`status` enum('pending','approved','rejected','withdrawn') NOT NULL DEFAULT 'pending',
	`applicationDate` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` datetime,
	`reviewedBy` int,
	`rejectionReason` text,
	`notes` text,
	`attachments` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `program_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`targetAudience` text,
	`requirements` text,
	`benefits` text,
	`applicationDeadline` datetime,
	`startDate` datetime,
	`endDate` datetime,
	`maxApplicants` int,
	`fundingAmount` decimal(15,2),
	`region` varchar(100),
	`contactEmail` varchar(320),
	`contactPhone` varchar(20),
	`documentationUrl` text,
	`imageUrl` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `programs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`trainingId` int NOT NULL,
	`enrollmentDate` timestamp NOT NULL DEFAULT (now()),
	`status` enum('enrolled','completed','cancelled') NOT NULL DEFAULT 'enrolled',
	`completionDate` datetime,
	`certificateUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `training_enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trainings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`domain` varchar(100) NOT NULL,
	`level` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
	`duration` varchar(50),
	`startDate` datetime NOT NULL,
	`endDate` datetime NOT NULL,
	`region` varchar(100),
	`format` enum('online','offline','hybrid') NOT NULL DEFAULT 'online',
	`maxParticipants` int,
	`currentParticipants` int NOT NULL DEFAULT 0,
	`instructorName` varchar(255),
	`instructorBio` text,
	`price` decimal(15,2) DEFAULT '0',
	`certificateProvided` boolean NOT NULL DEFAULT false,
	`imageUrl` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trainings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `dateOfBirth` datetime;--> statement-breakpoint
ALTER TABLE `users` ADD `region` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `city` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `profileImage` text;