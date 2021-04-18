import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICatalogue, Catalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';
import { CatalogueService } from './catalogue.service';

@Component({
  selector: 'jhi-catalogue-update',
  templateUrl: './catalogue-update.component.html',
})
export class CatalogueUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [],
    partnerId: [null, [Validators.required]],
    price: [null, [Validators.min(0)]],
    duration: [null, [Validators.min(0)]],
    sessionDt: [],
    category: [null, [Validators.required]],
  });

  constructor(protected catalogueService: CatalogueService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ catalogue }) => {
      if (!catalogue.id) {
        const today = moment().startOf('day');
        catalogue.sessionDt = today;
      }

      this.updateForm(catalogue);
    });
  }

  updateForm(catalogue: ICatalogue): void {
    this.editForm.patchValue({
      id: catalogue.id,
      description: catalogue.description,
      partnerId: catalogue.partnerId,
      price: catalogue.price,
      duration: catalogue.duration,
      sessionDt: catalogue.sessionDt ? catalogue.sessionDt.format(DATE_TIME_FORMAT) : null,
      category: catalogue.category,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const catalogue = this.createFromForm();
    if (catalogue.id !== undefined) {
      this.subscribeToSaveResponse(this.catalogueService.update(catalogue));
    } else {
      this.subscribeToSaveResponse(this.catalogueService.create(catalogue));
    }
  }

  private createFromForm(): ICatalogue {
    return {
      ...new Catalogue(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      partnerId: this.editForm.get(['partnerId'])!.value,
      price: this.editForm.get(['price'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      sessionDt: this.editForm.get(['sessionDt'])!.value ? moment(this.editForm.get(['sessionDt'])!.value, DATE_TIME_FORMAT) : undefined,
      category: this.editForm.get(['category'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICatalogue>>): void {
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
