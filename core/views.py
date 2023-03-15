from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from core.forms import ContactForm
from core.decorators import check_recaptcha
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.contrib import messages
from django.conf import settings
from django.http import HttpResponse
from django.views.generic import ListView
import os

def homeview(request):    
    
    context = {
    }
    
    return render(request, 'core/index.html', context)

class ProjectsView(ListView):
    model = Project
    queryset = Project.objects.filter(status=1).order_by('-updated_on')
    context_object_name = 'projects'
    template_name = 'core/projects.html'
    paginate_by = 20

def project_single(request, id):    
    
    project = get_object_or_404(Project, id=id)
    context = {
        'project':project
    }
    
    return render(request, 'core/project-single.html', context)

def about(request):    
    
    context = {
    }
    
    return render(request, 'core/about.html', context)

@check_recaptcha
def contact(request):
    if request.method == "POST":
        contact_form = ContactForm(request.POST)

        if contact_form.is_valid() and request.recaptcha_is_valid:
            subject = "Webstite Enquiry"
            body = {
            'name': 'Name: ' + contact_form.cleaned_data['name'],
            'email': 'Email Address: ' + contact_form.cleaned_data['email'],
			'message':'Message: ' + contact_form.cleaned_data['message'],
			}
            from_email = contact_form.cleaned_data['email']
            message = "\n".join(body.values())
            recipents = ['uwaagbai@outlook.com']
            try:
                send_mail(subject, message, from_email, recipents, fail_silently=False)
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            messages.success(request, "Email has been sent, you will receive an update from me soon.")
            return redirect("contact")
        else:
            messages.error(request, "Message was not sent, Please Try Again Later!")
            return redirect("contact")
            
    contact_form = ContactForm()
    site_key = settings.GOOGLE_RECAPTCHA_SITE_KEY
    context = {
        'form': contact_form,
        'site_key': site_key,
    }

    return render(request, "core/contact.html", context)


def error_404(request, exception):
    return render(request, '404.html')

def error_500(request, exception=None):
    return render(request, '500.html')

def download_resume(request):
    filename = 'MyResume.pdf'
    filepath = os.path.join(settings.STATIC_ROOT, filename)

    with open(filepath, 'rb') as resume:
        response = HttpResponse(resume.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response