import { VoucherPax } from '../models/voucherPax.model';

export class ReservaPaxs {
	reservaId: number;
	FechaServicio: string;
	paxs: VoucherPax[] = [];
}
