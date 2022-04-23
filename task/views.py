from django.shortcuts import render, redirect
from django.views.generic import View
from django.http import JsonResponse
from django.forms.models import model_to_dict

from .forms import TaskForm
from .models import Task

import json

class TaskView(View):
  def get(self, request):
    # リクエストがjson形式のとき
    if request.headers.get("Content-Type") == "application/json":
      # すべてのtaskを辞書型で受け取る
      tasks = Task.objects.values()
      tasks_list = list(tasks)
      # json形式でレスポンスを返す
      return JsonResponse(tasks_list, safe=False, status=200)
    return render(request, "task_list.html")

  def post(self, request):
      # json文字列を辞書型にし、pythonで扱えるようにする。
      task = json.loads(request.body)
      form = TaskForm(task)

      # データが正しければ保存する。
      if form.is_valid():
        new_task = form.save()
        return JsonResponse({"task": model_to_dict(new_task)}, status=200)
      return redirect("task_list_url")