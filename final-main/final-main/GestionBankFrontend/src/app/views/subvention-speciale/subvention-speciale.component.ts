import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubventionSpecialeService } from '../../services/subvention-speciale.service';
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from 'ng2-smart-table';
import { SubventionSpeciale } from '../../models/subventionSpeciale';
import { Grade } from '../../models/grade';
import { Corps } from '../../models/corps';
import { Subvention } from '../../models/subvention';
import { GradeService } from '../../services/grade.service';
import { CorpsService } from '../../services/corps.service';
import { SubventionService } from '../../services/subvention.service';


@Component({
  templateUrl: 'subvention-speciale.component.html'
})
export class SubventionSpecialeComponent {
      formulaire: FormGroup;
      gradeList : Grade[];
      corpsList : Corps[];
      corpsValue:string;
      subventionList: Subvention[];
      source: LocalDataSource;
      settings = {
        mode: 'inline',
        columns: {

          grade:{title:'Grade',
          valuePrepareFunction: (grade) => {
            return grade.libelle;
        }},
          corps:{title:'Corps',
          valuePrepareFunction: (corps) => {
            return corps.libelle;
        }},
        subvention:{title:'indemnité',
          valuePrepareFunction: (subvention) => {
            return subvention.libelle;
        }},
        montantSubvention: { title: 'montant indemnité', filter: false }
        },
        delete: {
          deleteButtonContent: '<i class="fa fa-trash-o"> supprimer</i>',
          confirmDelete: true
        },
        actions: {
          add: false,
          edit:false,
          position: 'right'
        },
        noDataMessage: 'Données introuvables',
        hideSubHeader: true,
        pager: { display: true, perPage: 8 }
      }

      constructor(private formBuilder: FormBuilder,
        private router: Router,
        private gradeService: GradeService,
        private corpsService: CorpsService,
        private subventionService: SubventionService,
        private subventionSpecialeService: SubventionSpecialeService,

        private toastr: ToastrService) { }

      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            grade: ['', Validators.required],
            corps: [''],
            subvention: ['', Validators.required],
            montantSubvention: ['', Validators.required]
        });
        this.getSubventionSpeciales();
        this.getsubventions();
        this.getCorps();
    }
    get grade(): AbstractControl {
      return this.formulaire.get('grade');
    }
    get corps(): AbstractControl {
      return this.formulaire.get('corps');
    }
    get subvention(): AbstractControl {
      return this.formulaire.get('subvention');
    }
    get montantSubvention(): AbstractControl {
      return this.formulaire.get('montantSubvention');
    }
    saveForm(){
      if (this.formulaire.valid) {
        let subventionSpeciale: SubventionSpeciale = this.formulaire.value;
        this.subventionSpecialeService.createSubventionSpeciale(subventionSpeciale).subscribe(
          data => {
            console.log("doneeeeeee")
            this.source.append(subventionSpeciale)
            this.toastr.success("subvention speciale a été ajouteé", "succès");
            this.router.navigateByUrl('subventionSpeciale/', {skipLocationChange: true}).then(() => this.router.navigate(['subventionSpeciale/']));
            this.formulaire.reset();
          },
          error => {
            console.log(error);
            this.toastr.error("quelque chose s'est mal passé", "error");
          }
        );
      }
    }
    resetForm (){
      this.formulaire.setValue({
        grade: ['', Validators.required],
        corps: [''],
        subvention: ['', Validators.required],
        montantSubvention: ['', Validators.required]
    });
    }
  getCorps() {
    this.corpsService.getCorpss().subscribe(
      corps => {
        this.corpsList = corps;
      },
      error => console.log('on fetch grades', error)
    );
  }
  getGrade($event: any) {
    console.log($event.id);
    this.gradeService.getGrade($event.id).subscribe(
      grade => {
        this.gradeList = grade;
      },
      error => console.log('on fetch grades', error)
    );
  }
    getsubventions() {
      this.subventionService.getSubventions().subscribe(
        subvention => {
          this.subventionList = subvention;
        },
        error => console.log('on fetch subvention', error)
      );
    }

    getSubventionSpeciales() {
      this.subventionSpecialeService.getSubventionSpeciales().subscribe(
        subventions => {
          this.source = new LocalDataSource(subventions);
        },
        error => console.log('on fetch subventions', error)
      );
    }

    deleteSubventionSpeciale(event) {
      if (window.confirm('êtes vous sûr de vouloir supprimer cette subvention specilae?')) {
        this.subventionSpecialeService.deleteSubventionSpeciale(event.data.id).subscribe(
          success => {
            this.toastr.success("subvention speciale supprimé", "succès");
            event.confirm.resolve();
          },
          error => {
            this.toastr.error("subvention specilae non supprimé", "erreur")
            console.log(`error on delete of subvention ${event.data.id}, ${error}`)
          });
      } else event.confirm.reject();
    }

    onSearch(query = '') {
      if (query == '') {
        this.source.setFilter([])
      } else {
        this.source.setFilter([
          { field: 'grade', search: query },
          { field: 'corps', search: query },
          { field: 'subvention', search: query },
          { field: 'montantSubvention', search: query },

        ], false);
      }
    }

}
