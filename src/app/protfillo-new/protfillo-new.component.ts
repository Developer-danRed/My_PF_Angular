
import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-protfillo-new',
  templateUrl: './protfillo-new.component.html',
  styleUrls: ['./protfillo-new.component.scss']
})
export class ProtfilloNewComponent {

  contactForm: FormGroup | any;
  private resumeUrl = '/assets/Resume/Premkumar_S.pdf';
  isShowScroll: boolean = false;
  isNavbarFixed: boolean = false;
  currentSection: string = '';

  contentArray = [
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Software Engineer",
    "Web Developer"
  ];
  currentIndex = 0;
  dynamicContent: any = 'Full Stack Developer';


  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.setupNavigation();
    this.updateContent();

    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    // Arrow icon
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.isShowScroll = true;
    } else {
      this.isShowScroll = false;
    }

    // navbar scroll colour changed
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isNavbarFixed = offset > 50; // Change 50 to the desired scroll offset

  }


  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  updateContent(): void {
    setInterval(() => {
      this.dynamicContent = this.contentArray[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.contentArray.length;
    }, 5000);
  }

  scrollToContact() {
    const contactSection = this.el.nativeElement.querySelector('#contact');
    contactSection.scrollIntoView({ behavior: 'smooth' } as any);
  }


  // Resume
  getResume(): Observable<Blob> {
    return this.http.get(this.resumeUrl, { responseType: 'blob' });
  }
  openResume(): void {
    this.getResume().subscribe((blob: Blob) => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }

  // Navigation
  setupNavigation() {
    const navLinks = this.el.nativeElement.querySelectorAll(".nav-link");

    navLinks.forEach((link: any) => {
      this.renderer.listen(link, "click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  user: any
  // Email sender 
  onSubmit(contactForm: FormGroup | any) {
    console.log(" contactForm.valid: ", contactForm.valid);
    console.log("contactForm.invalid: ", contactForm.invalid);
    try {
      if (contactForm.valid) {
        console.log("contactForm.value: ", contactForm.value);
        this.user = contactForm.value;
        var template_params = {
          from_name: this.user.name,
          message: this.user.message,
          email_id: this.user.email,
          reply_to: this.user.subject,
        };
        // var user_id = 'aZEB1TYMs4qU0953D'
        // private SERVICE_ID = 'service_ejjucix'
        // private TEMPLATE_ID = 'template_0bzsjya'
        // private PUBLIC_KEY = '5lQUsxJX8crS0C1nk'

        console.log("sendEmailParams: ", template_params);
        emailjs.init("5lQUsxJX8crS0C1nk") //Private Key
        emailjs.send("service_ejjucix", "template_0bzsjya", template_params)
          .then((response: any) => {
            if (response) {
              this.showSuccess()
              this.contactForm.reset();
            }
            console.log('SUCCESS!', response.status, response.text);
          }, (error) => {
            this.showFailed()
            console.log('FAILED...', error);
            this.contactForm.reset();
          });
      } else {
        this.markFormGroupTouched(contactForm);
      }
    } catch (error) {
      console.log("Error____", error);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }


  showSuccess() {
    this.toastrService.success('Message send successfully');
  }

  showFailed() {
    this.toastrService.error('Message send Failed');
  }






}

