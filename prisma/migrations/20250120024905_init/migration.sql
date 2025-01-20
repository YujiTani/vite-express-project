-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "state" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "questId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "courseId" TEXT,
    "prefix" TEXT NOT NULL,
    "overview" TEXT,
    "target" TEXT,
    "state" SMALLINT NOT NULL DEFAULT 0,
    "failedCase" SMALLINT NOT NULL DEFAULT 0,
    "completeCase" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "stageId" TEXT,
    "name" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "explanation" TEXT,
    "body" TEXT NOT NULL,
    "category" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "questionId" TEXT,
    "name" TEXT NOT NULL,
    "synonyms" TEXT NOT NULL,
    "orderIndex" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FalseAnswer" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "questionId" TEXT,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FalseAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_uuid_key" ON "Quest"("uuid");

-- CreateIndex
CREATE INDEX "Quest_state_idx" ON "Quest"("state");

-- CreateIndex
CREATE INDEX "Quest_uuid_idx" ON "Quest"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Course_uuid_key" ON "Course"("uuid");

-- CreateIndex
CREATE INDEX "Course_uuid_idx" ON "Course"("uuid");

-- CreateIndex
CREATE INDEX "Course_questId_idx" ON "Course"("questId");

-- CreateIndex
CREATE INDEX "Course_difficulty_idx" ON "Course"("difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_uuid_key" ON "Stage"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_prefix_key" ON "Stage"("prefix");

-- CreateIndex
CREATE INDEX "Stage_uuid_idx" ON "Stage"("uuid");

-- CreateIndex
CREATE INDEX "Stage_courseId_idx" ON "Stage"("courseId");

-- CreateIndex
CREATE INDEX "Stage_prefix_idx" ON "Stage"("prefix");

-- CreateIndex
CREATE INDEX "Stage_state_idx" ON "Stage"("state");

-- CreateIndex
CREATE UNIQUE INDEX "Question_uuid_key" ON "Question"("uuid");

-- CreateIndex
CREATE INDEX "Question_uuid_idx" ON "Question"("uuid");

-- CreateIndex
CREATE INDEX "Question_stageId_idx" ON "Question"("stageId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_uuid_key" ON "Word"("uuid");

-- CreateIndex
CREATE INDEX "Word_uuid_idx" ON "Word"("uuid");

-- CreateIndex
CREATE INDEX "Word_questionId_idx" ON "Word"("questionId");

-- CreateIndex
CREATE INDEX "Word_name_idx" ON "Word"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FalseAnswer_uuid_key" ON "FalseAnswer"("uuid");

-- CreateIndex
CREATE INDEX "FalseAnswer_uuid_idx" ON "FalseAnswer"("uuid");

-- CreateIndex
CREATE INDEX "FalseAnswer_questionId_idx" ON "FalseAnswer"("questionId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FalseAnswer" ADD CONSTRAINT "FalseAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
