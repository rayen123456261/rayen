import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Grade } from '../../models/grade';
import { GradeService } from '../../services/grade.service';
import { ToastrService } from "ngx-toastr";
import { CorpsService } from '../../services/corps.service';
import { Corps } from '../../models/corps';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  templateUrl: 'grade.component.html'
})
export class GradeComponent {
      formulaire: FormGroup;
      corpsList: Corps[];
      source: LocalDataSource;
      settings = {
        mode: 'inline',
        columns: {
          code: { title: 'code', filter: false },
          libelle: { title: 'Libelle', filter: false },
          corps: {title: 'corps',
          valuePrepareFunction: (corps) => {
            return corps.libelle;
        }}
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
        private toastr: ToastrService) { }

      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            code: ['', Validators.required],
            libelle: ['', Validators.required],
            corps:['',Validators.required]
        });
        this.getCorps()
        this.getGrades();
    }
    get code(): AbstractControl {
      return this.formulaire.get('code');
    }
    get libelle(): AbstractControl {
      return this.formulaire.get('libelle');
    }
    saveForm(){
      console.log(this.formulaire.value)
      if (this.formulaire.valid) {
        let grade: Grade = this.formulaire.value;
        this.gradeService.createGrade(grade).subscribe(
          data => {
            console.log("doneeeeeee")
            this.source.append(grade)
            this.toastr.success("Affectation a été ajouteé", "succès");
            this.router.navigateByUrl('grade/', {skipLocationChange: true}).then(() => this.router.navigate(['grade/']));
            this.formulaire.reset()
          },
          error => {
            console.log(error);
            this.toastr.error("quelque chose s'est mal passé", "error");
          }
        );
      }
    }
    resetForm (){
      this.formulaire.reset();
    }

    getCorps() {
      this.corpsService.getCorpss().subscribe(
        corps => {
          this.corpsList = corps;
        },
        error => console.log('on fetch Corps', error)
      );
    }

    getGrades() {
      this.gradeService.getGrades().subscribe(
        grades => {
          this.source = new LocalDataSource(grades);
        },
        error => console.log('on fetch grade', error)
      );
    }

    deleteGrade(event) {
      if (window.confirm('êtes vous sûr de vouloir supprimer cette affectation?')) {
        this.gradeService.deleteGrade(event.data.id).subscribe(
          success => {
            this.toastr.success("grade supprimé", "succès");
            event.confirm.resolve();
          },
          error => {
            this.toastr.error("grade non supprimé", "erreur")
            console.log(`error on delete of grade ${event.data.id}, ${error}`)
          });
      } else event.confirm.reject();
    }

    onSearch(query = '') {
      if (query == '') {
        this.source.setFilter([])
      } else {
        this.source.setFilter([
          { field: 'code', search: query },
          { field: 'libelle', search: query },
          { field: 'corps', search: query },

        ], false);
      }
    }

}
