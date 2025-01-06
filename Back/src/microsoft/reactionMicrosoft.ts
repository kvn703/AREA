import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

@Injectable()
export class ReactionMicrosoft {
  async createEvent(userService: any, arg: any) {
    const access_token = userService.token;

    const eventDetails = {
      subject: `${arg.title}`,
      start: {
        dateTime: `${arg.start}T10:00:00`,
        timeZone: 'UTC',
      },
      end: {
        dateTime: `${arg.end}T17:00:00`,
        timeZone: 'UTC',
      },
    };
    const url = 'https://graph.microsoft.com/v1.0/me/events';
    await axios
      .post(url, eventDetails, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Événement créé avec succès:', response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la création de l'événement:",
          error.response.data,
        );
      });
  }

  async createDraft(userService: any, arg: any) {
    const access_token = userService.token;
    const message = {
      subject: `${arg.subject}`,
      importance: 'Low',
      body: {
        contentType: 'HTML',
        content: `${arg.body}`,
      },
      toRecipients: [
        {
          emailAddress: {
            address: `${arg.to}`,
          },
        },
      ],
    };
    const url = 'https://graph.microsoft.com/v1.0/me/messages';
    await axios
      .post(url, message, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Draft crée avec succès:', response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de le la création de la draft',
          error.response.data,
        );
      });
  }

  async createCalendarGroup(userService: any, arg: any) {
    const access_token = userService.token;
    const content = {
      name: `${arg.name}`,
    };

    const url = 'https://graph.microsoft.com/v1.0/me/calendarGroups';
    await axios
      .post(url, content, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Calendar group crée avec succès:', response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de le la création du calendar group',
          error.response.data,
        );
      });
  }

  async createCalendar(userService: any, arg: any) {
    const access_token = userService.token;
    const content = {
      name: `${arg.name}`,
    };

    const url = 'https://graph.microsoft.com/v1.0/me/calendars';
    await axios
      .post(url, content, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Calendar crée avec succès:', response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de le la création du calendar',
          error.response.data,
        );
      });
  }

  async createOutlookCategory(userService: any, arg: any) {
    const access_token = userService.token;
    const content = {
      displayName: `${arg.displayName}`,
      color: 'Preset4',
    };

    const url = 'https://graph.microsoft.com/v1.0/me/outlook/masterCategories';
    await axios
      .post(url, content, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Outlook category crée avec succès:', response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de le la création de l'outlook category",
          error.response.data,
        );
      });
  }
}
