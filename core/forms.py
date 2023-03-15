from django import forms

class ContactForm(forms.Form):

	name = forms.CharField(widget = forms.TextInput(attrs={'class': 'form__input', 'placeholder': 'John', 'value':'', 'required':'true'}),  max_length = 50)
	email = forms.EmailField(widget = forms.EmailInput(attrs={'class': 'form__input', 'placeholder': 'johnbob@gmail.com', 'value':'', 'required':'true'}),  max_length = 150)
	message = forms.CharField(widget = forms.Textarea(attrs={'class': 'form__input', 'placeholder': 'Leave a message here', 'value':'', 'required':'true', 'style':'height:200px'}), max_length = 2000)

	




