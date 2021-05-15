import { Component, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fiche } from '../../models/Fiche';
import { FicheService } from '../../services/fiche.service';
import { ToastrService } from "ngx-toastr";
import { LocalDataSource } from 'ng2-smart-table';
import { Bank } from '../../models/bank';
import { Grade } from '../../models/grade';
import { Corps } from '../../models/Corps';
import { Affectation } from '../../models/affectation';
import { GradeService } from '../../services/grade.service';
import { CorpsService } from '../../services/corps.service';
import { AffectationService } from '../../services/affectation.service';
import { BankService } from '../../services/bank.service';
import { DatePipe } from '@angular/common'
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';



@Component({
  templateUrl: 'Fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent {
      formulaire: FormGroup;
      modalRef: BsModalRef;
      source: LocalDataSource;
      bankList:Bank[];
      affectationList: Affectation[];
      pixels: Grade[];
      corpsList: Corps[];
      corpsValue:string;
      ficheId:number;
     
      fichePosition:number;
      settings = {
        mode: 'external',
        columns: {
          nom: { title: 'nom', filter: false },
          prenom: { title: 'prenom', filter: false },
          lieu: { title: 'lieu', filter: false },
          adresse: { title: 'adresse', filter: false },
          email:{ title: 'email', filter: false },
          etatCivile: { title: 'etat Civile', filter: false },
          niveau: { title: 'niveau', filter: false },
          nbreEnfants:{ title: 'nbre Enfants', filter: false } ,
          salaire:{ title: 'salaire', filter: false } ,
          dateDeNaissance: { title: 'dateDeNaissance', valuePrepareFunction: (dateDeNaissance)=>{return this.datepipe.transform (dateDeNaissance , 'yyyy-MM-dd')} },
          corps:{title:'Corps', type: 'string', valuePrepareFunction: (corps) => { return corps.libelle; } },
          grade:{title:'Grade', type: 'string', valuePrepareFunction: (grade) => { return grade.libelle; } },
          affectation:{title:'Affectation', type: 'string', valuePrepareFunction: (affectation) => { return affectation.libelle } },
          rib:{ title: 'RIB', filter: false } ,
          bank:{title:'Bank', valuePrepareFunction: (bank) => { return bank.libelle; },
          

          filterFunction(cell?: string, search?: string): boolean {
          if (cell.includes(search)) {
            return true;
          } else  {
            return false;
          }
        }},
        },
        delete: {
          deleteButtonContent: '<i class="fa fa-trash-o"></i>',
          confirmDelete: true
        },
        edit: {
          editButtonContent: '<i class="fa fa-pencil"></i>',
          confirmSave: true
        },
        actions: {
          add: false,
          position: 'right'
        },
        noDataMessage: 'Données introuvables',
        hideSubHeader: true,
        pager: { display: true, perPage: 8 }
      }

      constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private ficheService: FicheService,
        private toastr: ToastrService,
        private gradeService: GradeService,
        private corpsService: CorpsService,
        private affectationService:AffectationService,
        private bankService: BankService,
        private modalService: BsModalService,
        private datepipe: DatePipe) { }
      ngOnInit(): void {
        this.formulaire = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            lieu: ['', Validators.required],
            adresse: ['', Validators.required],
            email: ['', Validators.required],
            etatCivile: ['', Validators.required],
            niveau: ['', Validators.required],
            nbreEnfants: [{value : '' , disabled : true }, Validators.required],
            salaire: ['', Validators.required],
            dateDeNaissance: ['', Validators.required],
            bank: ['', Validators.required],
            affectation: ['', Validators.required],
            grade: ['', Validators.required],
            rib: ['', Validators.required],
            corps: ['', Validators.required],
            user : [{id :this.authenticationService.currentUserValue['userid'] },Validators.required]
            
        });
        this.getFichee();
        this.getCorps();
        this.getBanks();
        this.getAffectations();
    }
    get nom(): AbstractControl {
      return this.formulaire.get('nom');
    }
  get rib(): AbstractControl {
    return this.formulaire.get('rib');
  }
    get prenom(): AbstractControl {
      return this.formulaire.get('prenom');
    }
    get lieu(): AbstractControl {
      return this.formulaire.get('lieu');
    }
    get adresse(): AbstractControl {
      return this.formulaire.get('adresse');
    }
    get email(): AbstractControl {
      return this.formulaire.get('email');
    }
    
    get etatCivile(): AbstractControl {
      return this.formulaire.get('etatCivile');
    }
    get niveau(): AbstractControl {
      return this.formulaire.get('niveau');
    }
    get nbreEnfants(): AbstractControl {
      return this.formulaire.get('nbreEnfants');
    }
    get salaire(): AbstractControl {
      return this.formulaire.get('salaire');
    }
    get dateDeNaissance(): AbstractControl {
      return this.formulaire.get('dateDeNaissance');
    }
    get bank(): AbstractControl {
      return this.formulaire.get('bank');
    }
    get affectation(): AbstractControl {
      return this.formulaire.get('affectation');
    }
    get corps(): AbstractControl {
      return this.formulaire.get('corps');
    }
    

    saveForm(){
      if (this.formulaire.valid) {
        let fiche: Fiche = this.formulaire.value;
        this.ficheService.createFiche(fiche).subscribe(
          data => {
            console.log("doneeeeeee")
            this.source.append(fiche)
            
            console.log(this.authenticationService.currentUserValue['userid'])
            this.toastr.success("fiche a été ajouteé", "succès");
            this.router.navigateByUrl('fiche/', {skipLocationChange: true}).then(() => this.router.navigate(['fiche/']));
            this.formulaire.reset();
          },
          error => {
            console.log(fiche)

            console.log(error);
            this.toastr.error("quelque chose s'est mal passé", "error");
          }
        );
      }
    }
    resetForm (){
      this.formulaire.reset();
    }

    getFichee() {
      this.ficheService.getFichee().subscribe(
        fiches => {
          this.source = new LocalDataSource(fiches);
        },
        error => console.log('on fetch fiches', error)
      );
    }
  
  rayen()
  {
    if(this.formulaire.controls.etatCivile.value == "marié(e)")
    {this.formulaire.controls.nbreEnfants.enable();}
    else
    {
      this.formulaire.controls.nbreEnfants.setValue(0);
      this.formulaire.controls.nbreEnfants.disable();
    }
  }
    deleteFiche(event) {
      if (window.confirm('êtes vous sûr de vouloir supprimer cette Fiche?')) {
        this.ficheService.deleteFiche(event.data.id).subscribe(
          success => {
            this.source.remove(event.data);
            this.toastr.success("fiche supprimé", "succès");
            event.confirm.resolve();
          },
          error => {
            this.toastr.error("fiche non supprimé", "erreur")
            console.log(`error on delete of fiche ${event.data.id}, ${error}`)
          });
      } else event.confirm.reject();
    }

    onSearch(query = '') {
      if (query == '') {
        this.source.setFilter([])
      } else {
        this.source.setFilter([
          {field:'nom', search:query},
          {field:'prenom', search:query},
          {field:'lieu', search:query},
          {field:'adresse', search:query},
          {field:'email', search:query},
          {field:'etatCivile', search:query},
          {field:'niveau', search:query},
          {field:'nbreEnfants', search:query},
          {field:'salaire', search:query},
          {field:'dateDeNaissance', search:query},
          {field:'bank', search:query},
          {field:'affectation', search:query},
          {field:'grade', search:query},
          {field:'corps', search:query}

        ], false);
      }
    }

  getGrade($event: any) {
        console.log($event.id);
    this.gradeService.getGrade($event.id).subscribe(
      grade => {
        this.pixels = grade;
        console.log(this.pixels);
      },
      error => console.log('on fetch grades', error)
    );
  }
  getCorps() {
    this.corpsService.getCorpss().subscribe(
      corps => {
        console.log(corps);
        this.corpsList = corps;
      },
      error => console.log('on fetch grades', error)
    );
  }
  getBanks() {
    this.bankService.getBanks().subscribe(
      banks => {
        this.bankList = banks;
      },
      error => console.log('on fetch Banks', error)
    );
  }
  getAffectations() {
    this.affectationService.getAffectations().subscribe(
      affectations => {
        this.affectationList = affectations;
      },
      error => console.log('on fetch affectations', error)
    );
  }

  openModal(template: TemplateRef<any>, event: any) {
    console.log(event)
    this.formulaire.patchValue(event.data)
    console.log(this.source)
    this.fichePosition=event.index;
    this.ficheId=event.data.id;
    this.corpsValue=event.data.corps.libelle;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  updateFiche(){
    if (this.formulaire.valid) {
      let fiche: Fiche = this.formulaire.value;
      this.ficheService.updateFiche(this.ficheId,fiche).subscribe(
        data => {
          console.log("doneeeeeee")
          this.toastr.success("fiche a été modifiée", "succès");
          this.formulaire.reset();
          this.modalRef.hide()
          this.getFichee();
        },
        error => {
          console.log(error);
          this.toastr.error("quelque chose s'est mal passé", "error");
        }
      );
    }
  }

  closeModal(){
    this.formulaire.reset();
    this.modalRef.hide()
  }
}
