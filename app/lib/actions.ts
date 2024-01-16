'use server';

import { revalidatePath } from 'next/cache';
import { sql } from "@vercel/postgres";
import { redirect } from 'next/navigation';

export async function createInvoice(formData: FormData) {
    const customerId: string = String(formData.get('customerId'));
    const amount: number = Number(formData.get('amount')) * 100;
    const status: string = String(formData.get('status'));
    const date: string = new Date().toISOString().split('T')[0];

    await sql`INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status} ,${date})`

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
    const customerId: string = String(formData.get('customerId'));
    const amount: number = Number(formData.get('amount')) * 100;
    const status: string = String(formData.get('status'));

    await sql`UPDATE invoices
    SET customer_id=${customerId},amount=${amount},status=${status}
    WHERE id=${id}`

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}