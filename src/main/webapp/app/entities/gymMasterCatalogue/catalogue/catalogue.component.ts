import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICatalogue } from 'app/shared/model/gymMasterCatalogue/catalogue.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CatalogueService } from './catalogue.service';
import { CatalogueDeleteDialogComponent } from './catalogue-delete-dialog.component';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { IPartners } from 'app/shared/model/gymmasterapppartners/partners.model';
import { PartnersService } from 'app/entities/gymmasterapppartners/partners/partners.service';

@Component({
  selector: 'jhi-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit, OnDestroy {
  catalogues?: ICatalogue[];
  partners?: IPartners[] | null = null;
  eventSubscriber?: Subscription;
  searchMode: any = false;
  currentSearch: string;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  categories: string[] = ['Show All', 'Dance', 'HIIT', 'Pilates', 'Spin', 'Swimming', 'Yoga'];
  searchField: any = '';
  categorySearch: any = '';
  account: Account | null = null;
  authSubscription?: Subscription;
  partnerIdValue: any = '';
  companyCategoryList: any[] = ['Show All', 'Dance', 'HIIT', 'Pilates', 'Spin', 'Swimming', 'Yoga'];
  i: any;
  childElements: any;

  constructor(
    protected catalogueService: CatalogueService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private accountService: AccountService,
    protected partnersService: PartnersService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;
    if (this.searchField !== '') {
      console.warn('entered categorySearch with searchField ' + this.searchField);
      this.catalogueService
        .search({
          page: pageToLoad - 1,
          query: this.currentSearch,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe(
          (res: HttpResponse<ICatalogue[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
          () => this.onError()
        );
      return;
    } else if (this.currentSearch) {
      console.warn('entered normal search with query ' + this.currentSearch);
      this.catalogueService
        .search({
          page: pageToLoad - 1,
          query: this.currentSearch,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe(
          (res: HttpResponse<ICatalogue[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
          () => this.onError()
        );
      return;
    }

    this.catalogueService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ICatalogue[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  search(query: string): void {
    this.currentSearch = query;
    if (query === '') {
      this.searchMode = false;
    } else this.searchMode = true;
    this.loadPage(1);
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInCatalogues();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.activatedRoute.data.subscribe(({ partners }) => (this.partners = partners));
    this.partnersService.query().subscribe((res: HttpResponse<IPartners[]>) => (this.partners = res.body || []));
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICatalogue): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCatalogues(): void {
    this.eventSubscriber = this.eventManager.subscribe('catalogueListModification', () => this.loadPage());
  }

  delete(catalogue: ICatalogue): void {
    const modalRef = this.modalService.open(CatalogueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.catalogue = catalogue;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ICatalogue[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
      this.router.navigate(['/catalogue'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          search: this.currentSearch,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.catalogues = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  searchByCategory(cat: any): void {
    console.warn('filter by: ' + cat);
    if (cat !== 'Show All') {
      console.warn('cat !== Show All');
      this.categorySearch = cat;
      this.searchMode = false;
    } else {
      console.warn('cat === Show All');
      this.categorySearch = '';
      this.searchMode = false;
    }

    this.loadPage(1);
  }

  companySelection(): void {
    console.warn('id: ' + this.partnerIdValue);
    console.warn(this.catalogues);
    this.companyCategoryList = ['Show All'];

    for (this.i = 0; this.i < this.catalogues!.length; this.i++) {
      if (this.catalogues![this.i].partnerId === this.partnerIdValue) {
        console.warn(this.catalogues![this.i].category);
        if (!this.companyCategoryList.includes(this.catalogues![this.i].category)) {
          console.warn('not included, add it in');
          this.companyCategoryList.push(this.catalogues![this.i].category);
        }
      }
    }
    console.warn(this.companyCategoryList);
  }

  clearFilter(): void {
    this.categorySearch = '';
    this.partnerIdValue = '';
    this.companyCategoryList = ['Show All', 'Dance', 'HIIT', 'Pilates', 'Spin', 'Swimming', 'Yoga'];
  }
}
