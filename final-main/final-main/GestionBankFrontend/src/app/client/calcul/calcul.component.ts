import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthenticationService } from '../../services/authentication.service';
import { FicheService } from '../../services/fiche.service';


@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.component.html',
  styleUrls: ['./calcul.component.css']
})
export class CalculComponent implements OnInit {
  source: LocalDataSource;
  public num = -1;

  public listcalcul = [];

  public listcalculadmin = [];

  settings = {
    mode: 'external',
    columns: {
      nom: {title: 'nom', filter: false},
      prenom: {title: 'prenom', filter: false},
      corps: {title: 'coprs', filter: false},
      grade: {title: 'grade', filter: false},
      salairedebase: {title: 'salaire de base', filter: false},
      somme: {title: 'somme des indemnité', filter: false},
      brute1: {title: 'salaire brute', filter: false},
      salairenet: {title: 'salaire net', filter: false},
      netapaie: {title: 'Net a payé', filter: false},
    },
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        {
          name: 'print',
          title: 'imprimer   <i class="fa fa-print"></i>',
        }
      ],
      position: 'right',
    },
    noDataMessage: 'Données introuvables',
    hideSubHeader: true,
    pager: {display: true, perPage: 8}
  }

  constructor(private authservice: AuthenticationService, private calculserv: FicheService) {
  }

  ngOnInit(): void {
    this.getcalcul(this.authservice.currentUserValue['userid']);
  }

  getcalcul(userid: number) {
    if (userid != 2) {
      this.calculserv.getcalcul(userid).subscribe(
        calcul => {
          this.source = new LocalDataSource(calcul);
        },
        error => console.log('on fetch calcul', error)
      );
    } else {
      this.calculserv.getcalculs().subscribe(
        calcul => {
          this.source = new LocalDataSource(calcul);
        },
        error => console.log('on fetch calcul', error)
      );
    }
  }

  onSearch(query = '') {
    if (query == '') {
      this.source.setFilter([])
    } else {
      this.source.setFilter([
        {field: 'nom', search: query},
        {field: 'prenom', search: query},
        {field: 'corps', search: query},
        {field: 'grade', search: query},
        {field: 'salairedebase', search: query},
        {field: 'somme', search: query},
        {field: 'brute1', search: query},
        {field: 'salairenet', search: query},
        {field: 'netapaie', search: query},
      ], false);
    }
  }
  onprint() {
    window.print();
  }
}
