import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { IPartners, Partners } from 'app/shared/model/gymmasterapppartners/partners.model';
import { PartnersService } from './partners.service';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-partners-update',
  templateUrl: './partners-update.component.html',
})
export class PartnersUpdateComponent implements OnInit {
  isSaving = false;
  account: Account | null = null;
  authSubscription?: Subscription;

  editForm = this.fb.group({
    id: [],
    companyName: [null, [Validators.required, Validators.maxLength(30)]],
    userName: [null, [Validators.required, Validators.maxLength(30)]],
    type: [null, [Validators.required]],
    activeInd: [null, [Validators.required]],
  });

  constructor(protected partnersService: PartnersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder,
  private accountService: AccountService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partners }) => {
      this.updateForm(partners);
    });
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  updateForm(partners: IPartners): void {
    this.editForm.patchValue({
      id: partners.id,
      companyName: partners.companyName,
      userName: partners.userName,
      type: partners.type,
      activeInd: partners.activeInd,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const partners = this.createFromForm();
    if (partners.id !== undefined) {
      this.subscribeToSaveResponse(this.partnersService.update(partners));
    } else {
      this.subscribeToSaveResponse(this.partnersService.create(partners));
    }
  }

  private createFromForm(): IPartners {
    return {
      ...new Partners(),
      id: this.editForm.get(['id'])!.value,
      companyName: this.editForm.get(['companyName'])!.value,
      userName: this.editForm.get(['userName'])!.value,
      type: this.editForm.get(['type'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartners>>): void {
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
}
