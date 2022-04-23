from django.db import models


class Task(models.Model):
  ## taskのタイトル
  title = models.CharField(max_length=255)
  ## taskの作成日
  created_at = models.DateField(auto_now_add=True)
  ## taskが完了したかどうか
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.title

  class Meta:
    ordering = ["completed", "-created_at"]