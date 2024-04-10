import { PrismaClient } from "@prisma/client";

// place files you want to import through the `$lib` alias in this folder.
export let prisma = new PrismaClient()