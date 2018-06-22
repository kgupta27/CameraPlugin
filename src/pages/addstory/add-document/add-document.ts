import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Platform, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WITHOUT_FIRST_REGES_SPECIAL } from '../../../Utility/Constant';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../../../providers/config/config';
import { FileChooser } from '@ionic-native/file-chooser';
import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { DocumentsPageModule } from '../documents/documents.module';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

declare var FilePicker;

@IonicPage()
@Component({
  selector: 'page-add-document',
  templateUrl: 'add-document.html',
})
export class AddDocumentPage {

  ownerId: any = 0;
  urnType: any = 0;
  isSubmit: boolean = false;
  public _baseUrl: any;
  addDocumentForm: FormGroup;
  file: any;
  isValid: boolean = false;
  fileUpload: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private keyboard: Keyboard, private fb: FormBuilder,
    public platform: Platform, private transfer: FileTransfer,
    private storage: Storage, public configService: ConfigProvider,
    private fileChooser: FileChooser, public toastCtrl: ToastServiceProvider,
    public modalCtrl: ModalController, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController, private filePath: FilePath,
    private files: File) {
    debugger;
    this.ownerId = navParams.data.ownerId;
    this.urnType = navParams.data.urnType;

    this._baseUrl = configService.getApiURI();
    this.addDocumentForm = fb.group({
      'title': [null, [Validators.required, Validators.pattern(WITHOUT_FIRST_REGES_SPECIAL)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDocumentPage');
  }

  closeAddDocument() {
    this.keyboard.close();
    this.navCtrl.pop();
  }

  uploadPdf() {
    debugger;
    if (this.platform.is('ios')) {
      FilePicker.pickFile(function (path) {
        let fileNameCount = path.lastIndexOf("/");
        let fileName = path.substr(fileNameCount + 1);
        let dirPath = path.substr(0, fileNameCount);
        let directoryPath = "file:///" + dirPath;
        this.getFileSize(directoryPath, fileName).then((nativeURL: string) => {
          console.log("nativeURL", nativeURL);
          this.uploadiOS(nativeURL);
        }).catch(e => {
          console.log("error", e)
        })

      }.bind(this), function (err) {
        console.log("error file ios", err);
      }.bind(this));
    } else {
      this.uploadAndroid();
    }
  }

  uploadiOS(filePath) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    // filePath = "file://" + filePath;
    this.file = filePath;
    console.log("File URL:: ", this.file);
    this.fileUpload = this.file.substring(this.file.lastIndexOf('/') + 1);
    this.fileUpload = this.fileUpload.split('%20').join(' ');
    loader.dismiss();
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // this.storage.get("userData").then((result) => {
    //   if (result) {

    //     let options: FileUploadOptions = {
    //       fileKey: 'pdfFile ',
    //       fileName: 'name.pdf',
    //       headers: {
    //         'Content-Type': undefined,
    //         'Authorization': result.token
    //       },
    //       params: { "app_key": "Testappkey" },
    //       chunkedMode: false,

    //     }

    //     var params = {
    //       ownerId: this.ownerId,
    //       title: this.addDocumentForm.value.title,
    //     };

    //     options.params = params;
    //     console.log("options:");
    //     console.log(JSON.stringify(options));
    //     fileTransfer.upload(filePath, this._baseUrl + 'api/v1/story/pdfFile', options)
    //       .then((data) => {
    //         console.log("Success!")
    //         console.log(data.response);
    //       }, (err) => {
    //         console.log(err);
    //       });
    //   } else {
    //     // this.toastCtrl.create('Something went wrong!');
    //   }
    // })
    //   .catch(e => console.log(e));
  }

  uploadAndroid1() {
    this.fileChooser.open()
      .then(uri => {
        // console.log(uri)
        this.file = uri;
        console.log("File URL:: ", this.file);

        // const fileTransfer: FileTransferObject = this.transfer.create();
        // this.storage.get("userData").then((result) => {
        //   if (result) {

        //     let options: FileUploadOptions = {
        //       fileKey: 'pdfFile ',
        //       fileName: 'name.pdf',
        //       headers: {
        //         'Content-Type': undefined,
        //         'Authorization': result.token
        //       },
        //       params: { "app_key": "Testappkey" },
        //       chunkedMode: false,

        //     }

        //     var params = {
        //       ownerId: this.ownerId,
        //       title: this.addDocumentForm.value.title,
        //     };

        //     options.params = params;
        //     console.log("options:");
        //     console.log(JSON.stringify(options));
        //     fileTransfer.upload(uri, this._baseUrl + 'api/v1/story/pdfFile', options)
        //       .then((data) => {
        //         console.log("Success!")
        //         console.log(data.response);
        //       }, (err) => {
        //         console.log(err);
        //       });
        //   } else {
        //     // this.toastCtrl.create('Something went wrong!');
        //   }
        // })
        //   .catch(e => console.log(e));
      });

  }

  uploadAndroid() {
    this.fileChooser.open().then(uri => {
      this.filePath.resolveNativePath(uri)
        .then(filePath => {
          var n = filePath.lastIndexOf("/");
          var directorypath = filePath.substr(0, n);
          var fileName = filePath.substr(n + 1);
          this.file = filePath;
          this.fileUpload = fileName
          console.log("Filename: ", fileName);

        }).catch(err => {
          // this.uploadedDocuments.splice(id, 1);
          // this.presentToast(this.documentErrMsg);
          console.log("Error: ", err);
        });
    }).catch(err => {
      console.log("Android FilePicker error", err);
    });
  }

  addDocument(value) {
    this.isValid = true;
    this.isSubmit = true;
    debugger;
    if (this.file != undefined) {
      this.isSubmit = false;
      if (this.addDocumentForm.valid) {
        this.isValid = false;

        const fileTransfer: FileTransferObject = this.transfer.create();
        this.storage.get("userData").then((result) => {
          if (result) {
            let loader = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            loader.present();

            console.log("fileName:: ", this.file.substring(this.file.lastIndexOf('/') + 1));
            let options: FileUploadOptions = {
              fileKey: 'pdfFile ',
              fileName: this.file.substring(this.file.lastIndexOf('/') + 1),
              headers: {
                'Content-Type': undefined,
                'Authorization': result.token
              },
              params: { "app_key": "Testappkey" },
              chunkedMode: false,

            }

            var params = {
              ownerId: this.ownerId,
              title: value.title,
            };

            options.params = params;
            console.log("options:");
            console.log(JSON.stringify(options));
            fileTransfer.upload(this.file, this._baseUrl + 'api/v1/story/pdfFile', options, true)
              .then((data) => {
                console.log("Success!")
                console.log(data.response);
                loader.dismiss();

                let documentDataObject: any;
                documentDataObject = data;
                if (documentDataObject.responseCode == '200') {

                  this.toastCtrl.create('Document added successfully');
                  this.closeAddDocument();
                  // let modal = this.modalCtrl.create("DocumentsPage", { ownerId: this.ownerId, urnType:this.urnType,});
                  // modal.present();
                }
                // this.viewCtrl.dismiss();
              }, (err) => {
                loader.dismiss();
                console.log(err);
                var m = err.code;
                console.log("m== ", m);
                if (m == 3) {
                  this.toastCtrl.create('Either your file format or file size is incorrect.');
                }
                else {
                  var r = JSON.parse(err.body);
                  console.log(r.message);
                  this.toastCtrl.create(r.message);
                }

              });
          } else {
            // this.toastCtrl.create('Something went wrong!');
          }
        })
          .catch(e => console.log(e));
      }
      else {
        this.isValid = true;
        console.log("False");
      }

    }
    else {
      this.isSubmit = true;
      console.log("Missing Document");
    }
  }

  getFileSize(directoryPath, fileName) {
    return new Promise((resolve, reject) => {
      this.files.resolveDirectoryUrl(directoryPath).then(directoryObj => {
        console.log("directoryObj", directoryObj);
        this.files.getFile(directoryObj, fileName, {}).then(fileEntry => {
          console.log("fileEntry", fileEntry);
          resolve(fileEntry.nativeURL);
        }).catch(err => reject("fileSizeError"));
      }).catch(err => reject("fileSizeError"));
    });
  }

}
