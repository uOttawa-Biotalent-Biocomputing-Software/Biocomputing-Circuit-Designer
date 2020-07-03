from django.shortcuts import render

# Create your views here.

def simulation(request):
    return render(request, 'simulationApp/index.html')