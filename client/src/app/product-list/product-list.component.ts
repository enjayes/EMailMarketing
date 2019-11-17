import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import { products } from '../products';


import { ApiService } from "../api.service";


function createShortBookTitle(subject) {

  if (subject.length > 30) {

    var subjectParts = subject.split(":")
    if (subjectParts.length > 2) {
      subject = subjectParts[0]
    }
    else if (subjectParts.length == 2) {
      if (subjectParts[1].length > 55) {
        subject = subjectParts[0]
      }
    }


    var subjectParts = subject.split("-")
    if (subjectParts.length > 2) {

      if (subjectParts.length > 1) {
        subject = subjectParts[0]
        for (var i = 1; i < subjectParts.length; i++) {
          if (subjectParts[i].length < 30 || subjectParts[i - 1].indexOf(" ") == -1 || subjectParts[i - 1].charAt(subjectParts[i - 1].length - 1) != " " || subjectParts[i].charAt(0) != " ") {
            subject = subject + "-" + subjectParts[i]
          }
          else {
            break;
          }
        }
      }
      else {
        subject = subjectParts[0]
      }
    }
    subject = subject.split("(")[0]
    subject = subject.trim()
  }
  return subject

}

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.html',
})
export class SendMailDialog {
  publisher: any
  book: any
  agencies: any = []
  templateIndex: any = 0
  templateCount: number = 1
  templateCountRange: Array<number> = []
  constructor(
    public dialogRef: MatDialogRef<SendMailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  getSubstringCount(str, substring) {
    var times = 0, index = -1;
    do {
      index = str.indexOf(substring, index + 1);
      if (index == -1) {
        break;
      }
      times++;
    } while (true)


    return times;
  }


  getSubstringIndex(str, substring, n) {
    var times = 0, index = -1;

    while (times <= n) {
      index = str.indexOf(substring, index + 1);
      times++;
      if (index == -1) {
        break;
      }
    }

    return index;
  }

  updateTemplate(shortbooktitle, isbn) {

    var template = this.data.template

    var pos1 = this.getSubstringIndex(template, "<mail>\n", this.templateIndex)
    console.log("pos1:")
    console.log(pos1)
    if (pos1 >= 0) {
      var pos2 = this.getSubstringIndex(template, "\n<mail/>", this.templateIndex)
      console.log("pos2:")
      console.log(pos2)
      if (pos2 >= 0 && pos2 > pos1) {
        template = template.substr(pos1 + 7, pos2 - pos1 - 7)
      }
    }

    this.data.mailtext = template
    if (shortbooktitle != "") {
      this.data.mailtext = this.data.mailtext.replace("<book/>", shortbooktitle)
    }

    if (isbn) {
      this.data.mailtext = this.data.mailtext.replace("<isbn/>", isbn)
    }
  }



  selectTemplate(index) {
    this.templateIndex = index
    var isbn = "<isbn/>"
    var shortbooktitle = createShortBookTitle(this.data.booktitle)

    for (var i = 0; i < this.publisher.books.length; i++) {
      if (this.publisher.books[i].title.trim().toLowerCase() == this.data.booktitle.trim().toLowerCase()) {
        isbn = this.publisher.books[i].isbn13
        if (!isbn) {
          isbn = this.publisher.books[i].isbn10
        }
        if (isbn) {
          break;
        }
      }
    }

    this.updateTemplate(shortbooktitle, isbn)

  }


  selectAddress(address) {
    this.data.mailaddress = address
  }

  selectBook(book) {
    this.data.booktitle = book.title

    var isbn = book.isbn13
    if (isbn == "") {
      isbn = book.isbn10
    }
    var shortbooktitle = createShortBookTitle(book.title)

    this.updateTemplate(shortbooktitle, isbn)

  }



  ngOnInit() {
    this.agencies = []
    this.publisher = this.data.publisher
    this.templateIndex = 0
    this.templateCount = this.getSubstringCount(this.data.template, "<mail>\n")
    this.templateCountRange = Array(this.templateCount)

    if (this.publisher) {
      //publisher.agencies.map((agency)=>{return agency.AdminEmail})
      for (var i = 0; i < this.publisher.agencies.length; i++) {
        if (this.publisher.agencies[i].AdminEmail) {
          if (!this.agencies.some((agency) => { return agency.mail == this.publisher.agencies[i].AdminEmail })) {
            this.agencies.push({ name: this.publisher.agencies[i].RegistrantName, mail: this.publisher.agencies[i].AdminEmail, website: this.publisher.agencies[i].Website, phone: this.publisher.agencies[i].AdminPhone, contact: this.publisher.agencies[i].FullAdminContactName })
          }
        }
      }
    }


    var isbn = ""
    var shortbooktitle = ""
    if (this.data.book) {
      isbn = this.data.book.isbn13
      if (isbn == "") {
        isbn = this.data.book.isbn10
      }
      shortbooktitle = createShortBookTitle(this.data.book.title)
      if (!this.data.mailsubject) {
        this.data.mailsubject = shortbooktitle + " - Mobile App"
      }

      if (!this.data.booktitle)
        this.data.booktitle = this.data.book.title
    }
    else {
      if (!this.data.mailsubject)
        this.data.mailsubject = ""
      if (!this.data.booktitle)
        this.data.booktitle = ""
    }

    if (!this.data.mailaddress) {
      if (this.data.mail) {

        this.data.mailaddress = this.data.mail
      }
      else {

        for (var i = 0; i < this.publisher.agencies.length; i++) {
          if (this.publisher.agencies[i].AdminEmail) {
            this.data.mailaddress = this.publisher.agencies[i].AdminEmail
            break;
          }
        }
      }
    }

    if (!this.data.mailtext) {

      this.updateTemplate(shortbooktitle, isbn)

    }

  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'template-dialog',
  templateUrl: './template-dialog.html',
})



export class TemplateDialog {

  newTemplate: string = "<mail>\n\n<book/>\n<isbn/>\n\n<mail/>\n\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖"
  constructor(
    public dialogRef: MatDialogRef<SendMailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  addTemplate() {
    if (this.data.template) {
      this.data.template = this.data.template + "\n\n" + this.newTemplate
    }
    else {
      this.data.template = this.newTemplate
    }
  }

  ngOnInit() {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'statistics',
  templateUrl: './statistics.html',
})
export class StatisticsDialog {

   constructor(
    public dialogRef: MatDialogRef<SendMailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = products;
  publisherList: any;
  selectedPublisherList: any;
  selectedPublisher: any = { _id: "", books: [], RegistrantName: "" }
  items: Object
  selectedPublisherAgencies: Array<any> = []
  selectedPublisherAddress: string = ""
  selectedState: string = "found"
  selectedStateSaved: string = "saved"
  selectedPublisherSaved: any = {}
  accordionState: boolean = false
  template: string = ""
  filterText: string = ""
  statistics:any = {}

  host: string = "http://192.168.178.91:4201"
  url: string = this.host + "/publishers/get" //192.168.178.91:4201
  mailurl: string = this.host + "/publishers/send" //192.168.178.91:4201
  updateurl: string = this.host + "/publishers/update" //192.168.178.91:4201

  publisherStates: Object[] = [
    { value: 'found', viewValue: 'Found Publishers' },
    { value: 'saved', viewValue: 'Saved Publishers' },
    { value: 'sent', viewValue: 'Contacted' },
  ];


  @ViewChild(MatSelectionList, { static: true }) publishers: MatSelectionList;
  @ViewChild("accordion", { static: false }) accordion: MatAccordion;


  constructor(private _snackBar: MatSnackBar, private api: ApiService, public dialog: MatDialog) { }



  filterChanged() {

    this.selectedPublisherState(false)

  }

  createShortTitle(title) {
    return createShortBookTitle(title)
  }

  openAccordion(state) {
    if (state) {
      this.accordion.openAll()
    }
    else {
      this.accordion.closeAll()
    }
    this.accordionState = state
  }


  sendMail(data) {

    this.api.sendMail(this.mailurl, data).subscribe(
      data => {
        console.log(data)
        if (data.status == "ok") {
          this._snackBar.open("Your email was sent successfully", "OK", {
            duration: 2000,
          });
        }
      },
      err => {
        this._snackBar.open("Error: Your email was not sent successfully", "OK", {
          duration: 10000,
        });
      }
    );
  }

  openMailTemplate() {
    const dialogRef = this.dialog.open(TemplateDialog, {
      width: "900px", data: { template: this.template }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action == "close") {
        this.template = result.template
        this.api.update(this.updateurl, "template", this.template).subscribe(
          data => { },
          err => { }
        )

      }
    });
  }

  openStatistics() {
    const dialogRef = this.dialog.open(StatisticsDialog, {
      data: { statistics: this.statistics }
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }


  cleanMail(data) {
    var mail: any = {}
    mail.mailaddress = data.mailaddress
    mail.mailsubject = data.mailsubject
    mail.mailtext = data.mailtext
    mail.booktitle = data.booktitle
    mail.sent = data.sent
    mail.update = data.update
    mail.index = data.index
    return mail
  }


  openMailTimeout(mail, index) {
    setTimeout(() => {

      this.openMail(mail, index)

    }, 100);
  }



  openMail(mail, index) {
    const dialogRef = this.dialog.open(SendMailDialog, {
      width: "900px", data: { publisher: this.selectedPublisher, mail: mail.mailaddress, booktitle: mail.booktitle, mailsubject: mail.mailsubject, mailtext: mail.mailtext, update: true, index: index, template: this.template }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action == "save") {
          var mail = this.cleanMail(result.data)
          this.savePublisher(false, mail)
        } else if (result.action == "send") {
          result.data.sent = true
          var mail = this.cleanMail(result.data)
          this.sendMail(mail)
          this.savePublisher(true, mail)
        }
      }
    });
  }


  openDialogTimeout(book, mail, event) {


    if (event) {
      var target = event.target || event.srcElement || event.currentTarget;
      target.blur()
    }
    setTimeout(() => {

      this.openDialog(book, mail)

    }, 100);
  }



  openDialog(book, mail) {

    const dialogRef = this.dialog.open(SendMailDialog, {
      width: "900px", data: { publisher: this.selectedPublisher, book: book, mail: mail, template: this.template }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action == "save") {
        var mail = this.cleanMail(result.data)
        this.savePublisher(false, mail)
      } else if (result.action == "send") {
        result.data.sent = true
        var mail = this.cleanMail(result.data)
        this.sendMail(mail)
        this.savePublisher(true, mail)
      }
    });
  }



  selectPublisher(publisher) {
    this.selectedPublisherSaved[this.selectedState] = publisher
    this.selectedPublisher = publisher
    this.selectedPublisherAgencies = []//publisher.agencies.map((agency)=>{return agency.AdminEmail})
    this.selectedPublisherAddress = ""
    for (var i = 0; i < publisher.agencies.length; i++) {
      if (!this.selectedPublisherAddress) {
        this.selectedPublisherAddress = publisher.agencies[i].FullAddress + ", " + publisher.agencies[i].Country
      }
      if (publisher.agencies[i].AdminEmail || publisher.agencies[i].Website || publisher.agencies[i].AdminPhone || publisher.agencies[i].FullAdminContactName) {
        if (!this.selectedPublisherAgencies.some((agency) => { return agency.mail == publisher.agencies[i].AdminEmail })) {
          this.selectedPublisherAgencies.push({ name: publisher.agencies[i].RegistrantName, mail: publisher.agencies[i].AdminEmail, website: publisher.agencies[i].Website, phone: publisher.agencies[i].AdminPhone, contact: publisher.agencies[i].FullAdminContactName })

        }
      }
    }





  }

  openTab(url) {
    var win = window.open(url, '_blank');
    if (win)
      win.focus();
    else {
      setTimeout(function () { this.openTab(url) }, 500)
    }

  }
  onListClicked(publisher) {
    publisher.visibleBooks =  publisher.books.slice(0,50)
    this.selectPublisher(publisher)

  }

  onBookClicked(book) {
    this.openTab(book.url)
  }
  onSearchPublisherClicked() {
    this.openTab("https://www.google.de/search?q=" + encodeURIComponent(this.selectedPublisher.RegistrantName))
  }
  onSearchPublisherLocationClicked() {
    this.openTab("https://www.google.de/maps/place/" + encodeURIComponent(this.selectedPublisherAddress))
  }

  openPerson(agency) {
    if (agency.contact) {
      this.openTab("https://www.google.de/search?q=" + encodeURIComponent(agency.contact + " " + agency.name))
    }
    else {
      this.openTab("https://www.google.de/search?q=" + encodeURIComponent(agency.name))
    }
  }

  searchAgency(agency, webpage, nogoogle) {
    if (agency.name) {
      if (!nogoogle) {
        this.openTab("https://www.google.de/search?q=" + encodeURIComponent((agency.name + " " + webpage).trim()))
      }
      else if (webpage == "LinkedIn") {
        this.openTab("https://www.linkedin.com/search/results/companies/?keywords=" + encodeURIComponent((agency.name).trim()))
      }
      else if (webpage == "Xing") {
        this.openTab("https://www.xing.com/search/companies?keywords=" + encodeURIComponent((agency.name).trim()))
      }
      else if (webpage == "Facebook") {
        this.openTab("https://www.facebook.com/search/top/?q=" + encodeURIComponent((agency.name).trim()))
      }
      else {
        this.openTab("https://www.google.de/search?q=" + encodeURIComponent((agency.name + " " + webpage).trim()))

      }
    }
  }


  removePublisher() {
    this.api.update(this.updateurl, "delete", this.selectedPublisher).subscribe(
      data => {

      },
      err => {

      }
    )
    var savedSelectedPublisher = this.selectedPublisher
    this.selectedPublisher.saved = false
    this.selectedPublisher.sent = false
    this.selectedPublisherState(false)
    if (this.selectedPublisherList.length > 0) {
      var newPublisher = this.selectedPublisherList[0]
      var publisherFound = false;
      for (var i = 0; i < this.publisherList.length; i++) {
        if ((this.publisherList[i].saved && this.selectedState == "saved") || (this.publisherList[i].sent && this.selectedState == "sent")) {
          newPublisher = this.publisherList[i]
          if (publisherFound == true) {
            break;
          }
        }
        if (this.publisherList[i].RegistrantName === savedSelectedPublisher.RegistrantName) {
          publisherFound = true
        }

      }
      this.selectPublisher(newPublisher)
    }
    else {
      this.selectPublisher({ _id: "", books: [], RegistrantName: "" })
    }

  }

  deleteMail(mail: any, index: any) {

    this.selectedPublisher.mails.splice(index, 1)
    this.api.update(this.updateurl, "mails", this.selectedPublisher).subscribe(
      data => { },
      err => { }
    )
  }

  savePublisher(send: boolean, mail: any) {

    if (send) {
      this.api.update(this.updateurl, "send", this.selectedPublisher).subscribe(
        data => { },
        err => { }
      )
    }
    else {
      this.api.update(this.updateurl, "save", this.selectedPublisher).subscribe(
        data => { },
        err => { }
      )
    }


    var savedSelectedPublisher = this.selectedPublisher

    if (mail) {

      if (!this.selectedPublisher.mails) {
        this.selectedPublisher.mails = []
      }
      if (mail.update) {
        this.selectedPublisher.mails[mail.index] = mail
      }
      else {
        this.selectedPublisher.mails.push(mail)
      }
      this.api.update(this.updateurl, "mails", this.selectedPublisher).subscribe(
        data => { },
        err => { }
      )

    }

    if (send) {
      this.selectedPublisher.saved = true
      this.selectedPublisher.sent = true
      this.selectedPublisherSaved["sent"] = this.selectedPublisher
    }
    else {
      this.selectedPublisher.saved = true
      this.selectedPublisherSaved["saved"] = this.selectedPublisher
    }




    this.selectedPublisherState(false)

    if (this.selectedState == "found" || (this.selectedState == "saved" && (!this.selectedPublisher.saved || this.selectedPublisher.sent)) || (this.selectedState == "sent" && !this.selectedPublisher.sent)) {
      if (this.selectedPublisherList.length > 0) {
        var newPublisher = this.selectedPublisherList[0]
        var publisherFound = false;
        for (var i = 0; i < this.publisherList.length; i++) {
          if ((!this.publisherList[i].saved && this.selectedState == "found") || (!this.publisherList[i].saved && !this.publisherList[i].sent && this.selectedState == "sent")) {
            newPublisher = this.publisherList[i]
            if (publisherFound == true) {
              break;
            }
          }
          if (this.publisherList[i].RegistrantName === savedSelectedPublisher.RegistrantName) {
            publisherFound = true
          }

        }
        this.selectPublisher(newPublisher)
      }
      else {
        this.selectPublisher({ _id: "", books: [], RegistrantName: "" })
      }
    }



  }

  filterEMail(agency) {
    return (agency.AdminEmail != "")
  }

  selectedPublisherState(changeSelected) {

    if (this.selectedState == "found") {
      this.selectedPublisherList = this.publisherList.filter((publisher) => { return !publisher.saved && !publisher.sent && !publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != "" })
    } else if (this.selectedState == "saved") {
      this.selectedPublisherList = this.publisherList.filter((publisher) => { return publisher.saved && !publisher.sent && !publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != "" })
    }
    else if (this.selectedState == "sent") {
      this.selectedPublisherList = this.publisherList.filter((publisher) => { return publisher.sent && !publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != "" })
    }
    else if (this.selectedState == "deleted") {
      this.selectedPublisherList = this.publisherList.filter((publisher) => { return publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != "" })
    }

    
    if (this.filterText) {
      var filterLowerCase = this.filterText.toLowerCase().trim().split(",")
      this.selectedPublisherList = this.selectedPublisherList.filter(
        (publisher) => {
          if(filterLowerCase){
            if(filterLowerCase.some(filterPart=>{
              if(filterPart){
                if (publisher.agencies.some((agency) => {
                  var registrantNameLowerCase = agency.RegistrantName.toLowerCase().trim()
                  if (registrantNameLowerCase.indexOf(filterPart) != -1 || filterPart.indexOf(registrantNameLowerCase) != -1) {
                    return true
                  }
                })) {
                  return true
                }

                if (publisher.books.some((book) => {
                  var titleLowerCase = book.title.toLowerCase().trim()
                  if (titleLowerCase.indexOf(filterPart) != -1 || filterPart.indexOf(titleLowerCase) != -1) {
                    return true
                  }
                })) {
                  return true
                }

                if (publisher.agencies.some((agency) => {
                  var countryLowerCase = agency.Country.toLowerCase().trim()
                  if (countryLowerCase.indexOf(filterPart) != -1 || filterPart.indexOf(countryLowerCase) != -1) {
                    return true
                  }
                })) {
                  return true
                }
              }
              else{
                return false
              }
            })){
              return true
            }
          }
          else{
            return true
          }
        }

      )
    }




    if (changeSelected) {
      if (this.selectedPublisherList.length > 0) {
        if (this.selectedPublisherSaved[this.selectedState]) {
          this.selectPublisher(this.selectedPublisherSaved[this.selectedState])
        }
        else {
          this.selectPublisher(this.selectedPublisherList[0])
        }

      }
      else {
        this.selectPublisher({ _id: "", books: [], RegistrantName: "" })
      }

    }
  }


  sortSalesRank(a, b) {
    if(a.sales_rank <= 0 && b.sales_rank <= 0){
      return 0
    }
    else if(b.sales_rank <= 0){
      return -1
    }
    else if(a.sales_rank <= 0){
      return 1
    }
    else if(a.sales_rank < b.sales_rank){
      return -1
    }
    else if(a.sales_rank > b.sales_rank){
      return 1
    }
    else{
      return 0
    }
  }


  preparePublisherList(publishers,statistics){

    var filterPublisherList = ["FinanzBuch Verlag","Unknown"]

    publishers = publishers.filter((publisher)=>{
      if(filterPublisherList.some((text)=>{
        
        if(publisher.RegistrantName && publisher.RegistrantName.indexOf(text) != -1){
          return true
        }
      })){
        console.log("FILTER OUT: "+publisher.RegistrantName)
        return false
      }
      else{
        return true
      }
    })

    var booksNum = 0

    publishers.forEach((publisher) => {
    
      var bestSalesRank = 100000000

      if (!publisher.books) {
        publisher.books = []
      }

      booksNum = booksNum+publisher.books.length

      publisher.books.sort(this.sortSalesRank)

      publisher.books.some((book) => {
        if (book.sales_rank && book.sales_rank > 0) {
          bestSalesRank = book.sales_rank
          return true
        }
      })
      publisher.sales_rank = bestSalesRank


      publisher.visibleBooks = publisher.books.slice(0, 50)

 
    })

    statistics.booksNum = booksNum
    statistics.publishersNum = publishers.length


    publishers.sort(this.sortSalesRank)
    console.log("preparePublisherList ready")

    return publishers

  }


  onScroll(){
    if(this.selectedPublisher.books.length!=this.selectedPublisher.visibleBooks.length){
      var detailscontainer = document.getElementById('publisherDetailsContainer') as HTMLElement;
      if(detailscontainer.scrollHeight - detailscontainer.scrollTop <= detailscontainer.clientHeight+300){
        
        this.selectedPublisher.visibleBooks = this.selectedPublisher.books.slice(0,this.selectedPublisher.visibleBooks.length+20)
      }
    }
  }

  ngOnInit() {

    this.api
      .getTemplate(this.url)
      .subscribe(
        data => {
          this.template = data.template

        },
        err => {
          console.log(err);
        }
      );


    this.api
      .getPublishers(this.url)
      .subscribe(
        data => {
          this.statistics = {}
          data = this.preparePublisherList(data,this.statistics)
          this.publisherList = data
          this.selectedPublisherState(false)
          if (this.selectedPublisherList.length > 0) {
            this.selectPublisher(this.selectedPublisherList[0])
          }
        },
        err => {
          console.log(err);
        }
      );


    this.publisherList = [];




    
    //onSendEMailClicked()
  }

}








/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/