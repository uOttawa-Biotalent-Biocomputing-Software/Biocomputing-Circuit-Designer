from django.shortcuts import render
from .models import Project

# Create your views here.

def simulation(request):
    return render(request, 'simulationApp/index.html')


def save_file(request):
    print('File is Saved.')
    
    project_name = request.POST['pName']
    project = Project(projectName = project_name)
    project.save()

    return render(request, 'simulationApp/index.html')