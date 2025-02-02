export interface IUnitOfWork {
	begin(): Promise<void>;
	commit(): Promise<void>;
	rollback(): Promise<void>;
}

export const UNIT_OF_WORK = 'IUnitOfWork';
