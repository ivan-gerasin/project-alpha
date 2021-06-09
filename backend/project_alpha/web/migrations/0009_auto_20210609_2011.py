# Generated by Django 3.1.7 on 2021-06-09 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0008_auto_20210609_1709'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usersettings',
            name='send_email_updates_messages',
        ),
        migrations.RemoveField(
            model_name='usersettings',
            name='send_email_updates_threads',
        ),
        migrations.RemoveField(
            model_name='usersettings',
            name='send_email_updates_user_quests_reviews',
        ),
        migrations.RemoveField(
            model_name='usersettings',
            name='send_email_updates_user_reviews',
        ),
        migrations.RemoveField(
            model_name='usersettings',
            name='send_me_emails_with_news_from_project_alpha',
        ),
        migrations.AddField(
            model_name='usersettings',
            name='send_emails_with_news',
            field=models.BooleanField(default=False, verbose_name='send_emails_with_news'),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='send_updates_messages',
            field=models.BooleanField(default=False, verbose_name='send_updates_messages'),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='send_updates_threads',
            field=models.BooleanField(default=False, verbose_name='send_updates_threads'),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='send_user_quests_reviews',
            field=models.BooleanField(default=False, verbose_name='send_user_quests_reviews'),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='send_user_reviews',
            field=models.BooleanField(default=False, verbose_name='send_user_reviews'),
        ),
        migrations.AlterField(
            model_name='usersettings',
            name='about_user',
            field=models.CharField(blank=True, default=False, max_length=500, verbose_name='about_user'),
        ),
    ]
