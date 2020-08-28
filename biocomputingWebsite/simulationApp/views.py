from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe_options_exempt


from .models import Project

# Create your views here.

@xframe_options_exempt
def simulation(request):
    return render(request, 'simulationApp/index.html')

def home(request):
    return render(request, 'simulationApp/home.html')

def about(request):
    return render(request, 'simulationApp/about.html')

def renderSBGN(request):
    return render(request, 'simulationApp/renderSBGN.html')

def renderOutput(request):
    from libsbgnpy import render, utils
    import os.path
    from IPython.display import Image

    filename = input("Enter the name of the existing SBGN file: ")
    if ".sbgn" not in filename:
    	filename = filename + ".sbgn"

    exist = os.path.isfile(filename)

    while exist==False:
    	filename = input("The file does not exist, please try again: ")
    	if ".sbgn" not in filename:
    		filename = filename + ".sbgn"
    	exist = os.path.isfile(filename)

    sbgn = utils.read_from_file(filename)

    pngname = ""

    for w in filename:
    	if w == '.':
    		break;
    	else:
    		pngname += w
    pngname += ".png"

    render.render_sbgn(sbgn, pngname)

    #RETURNS THE WHOLE PNG ON WEBPAGE AS OUTPUT
    #image_data = open(pngname, "rb").read()
    #return HttpResponse(image_data, content_type="image/png")

    #DOWNLOAD THE RENDERED PNG FILE
    test_file = open(pngname, 'rb')
    response = HttpResponse(content=test_file)
    response['Content-Type'] = 'image/png'
    response['Content-Disposition'] = 'attachment; filename="%s"' \
        % pngname
    return response


def save_file(request):
    print('File is Saved.')
    
    project_name = request.POST['pName']
    project = Project(projectName = project_name)
    project.save()

    return render(request, 'simulationApp/index.html')
