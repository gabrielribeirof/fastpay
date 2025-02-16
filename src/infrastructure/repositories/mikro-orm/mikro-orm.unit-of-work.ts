import { EntityManager } from '@mikro-orm/postgresql';
import { IUnitOfWork } from '@/shared/seedwork/iunit-of-work';
import { Injectable } from '@nestjs/common';
import { ITransferRepository } from '@/domain/transfer/itransfer.repository';
import { MikroOrmTransferRepository } from './mikro-orm-transfer.repository';
import { IWalletRepository } from '@/domain/wallet/iwallet.repository';
import { MikroOrmWalletRepository } from './mikro-orm-wallet.repository';

@Injectable()
export class MikroOrmUnitOfWork implements IUnitOfWork {
	private em: EntityManager;

	public transferRepository: ITransferRepository;
	public walletRepository: IWalletRepository;

	constructor(em: EntityManager) {
		this.em = em.fork();
		this.transferRepository = new MikroOrmTransferRepository(this.em);
		this.walletRepository = new MikroOrmWalletRepository(this.em);
	}

	async begin() {
		await this.em.begin();
	}

	async commit() {
		await this.em.commit();
	}

	async rollback() {
		await this.em.rollback();
	}
}
