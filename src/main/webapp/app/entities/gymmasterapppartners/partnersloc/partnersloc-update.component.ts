import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPartnersloc, Partnersloc } from 'app/shared/model/gymmasterapppartners/partnersloc.model';
import { PartnerslocService } from './partnersloc.service';
import { IPartners } from 'app/shared/model/gymmasterapppartners/partners.model';
import { PartnersService } from 'app/entities/gymmasterapppartners/partners/partners.service';

@Component({
  selector: 'jhi-partnersloc-update',
  templateUrl: './partnersloc-update.component.html',
})
export class PartnerslocUpdateComponent implements OnInit {
  isSaving = false;
  partners: IPartners[] = [];

  editForm = this.fb.group({
    id: [],
    region: [null, [Validators.required]],
    address: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(66)]],
    postalCode: [null, [Validators.required, Validators.max(6)]],
    openTime: [null, [Validators.required]],
    closeTime: [null, [Validators.required]],
    pocName: [null, [Validators.required]],
    pocNo: [null, [Validators.required]],
    pocEmail: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    partnersId: [],
  });

  constructor(
    protected partnerslocService: PartnerslocService,
    protected partnersService: PartnersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partnersloc }) => {
      if (!partnersloc.id) {
        const today = moment().startOf('day');
        partnersloc.openTime = today;
        partnersloc.closeTime = today;
      }

      this.updateForm(partnersloc);

      this.partnersService.query().subscribe((res: HttpResponse<IPartners[]>) => (this.partners = res.body || []));
    });
  }

  updateForm(partnersloc: IPartnersloc): void {
    this.editForm.patchValue({
      id: partnersloc.id,
      region: partnersloc.region,
      address: partnersloc.address,
      postalCode: partnersloc.postalCode,
      openTime: partnersloc.openTime ? partnersloc.openTime.format(DATE_TIME_FORMAT) : null,
      closeTime: partnersloc.closeTime ? partnersloc.closeTime.format(DATE_TIME_FORMAT) : null,
      pocName: partnersloc.pocName,
      pocNo: partnersloc.pocNo,
      pocEmail: partnersloc.pocEmail,
      partnersId: partnersloc.partnersId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const partnersloc = this.createFromForm();
    if (partnersloc.id !== undefined) {
      this.subscribeToSaveResponse(this.partnerslocService.update(partnersloc));
    } else {
      this.subscribeToSaveResponse(this.partnerslocService.create(partnersloc));
    }
  }

  private createFromForm(): IPartnersloc {
    return {
      ...new Partnersloc(),
      id: this.editForm.get(['id'])!.value,
      region: this.editForm.get(['region'])!.value,
      address: this.editForm.get(['address'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      openTime: this.editForm.get(['openTime'])!.value ? moment(this.editForm.get(['openTime'])!.value, DATE_TIME_FORMAT) : undefined,
      closeTime: this.editForm.get(['closeTime'])!.value ? moment(this.editForm.get(['closeTime'])!.value, DATE_TIME_FORMAT) : undefined,
      pocName: this.editForm.get(['pocName'])!.value,
      pocNo: this.editForm.get(['pocNo'])!.value,
      pocEmail: this.editForm.get(['pocEmail'])!.value,
      partnersId: this.editForm.get(['partnersId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartnersloc>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPartners): any {
    return item.id;
  }
}
