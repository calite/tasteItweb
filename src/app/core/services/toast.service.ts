import { Injectable } from '@angular/core';
import { ToastNotificationInitializer, DialogLayoutDisplay, ToastProgressBarEnum, ToastUserViewTypeEnum, AppearanceAnimation, DisappearanceAnimation, ToastPositionEnum, ConfirmBoxInitializer, IConfirmBoxPublicResponse } from '@costlydeveloper/ngx-awesome-popup';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {


  constructor() { }

  toastGenerator(title: string, msg: string, type: number, position: ToastPositionEnum) {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle(title);
    newToastNotification.setMessage(msg);

    // Choose layout color type
    newToastNotification.setConfig({
      autoCloseDelay: 2000, // optional
      textPosition: 'center', // optional
      layoutType: type, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
      toastPosition: position,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
  }

  alertGenerator(title: string, msg: string, type: number): Observable<IConfirmBoxPublicResponse> {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle(title);
    newConfirmBox.setMessage(msg);

    // Choose layout color type
    newConfirmBox.setConfig({
      layoutType: type, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      confirmLabel: 'Ok!',
      declineLabel: 'cancel'
    });

    // Simply open the popup
    return newConfirmBox.openConfirmBox$();
  }

  alertGeneratorWithoutCancel(title: string, msg: string, type: number): Observable<IConfirmBoxPublicResponse> {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle(title);
    newConfirmBox.setMessage(msg);
    newConfirmBox.setButtonLabels('Ok');

    // Choose layout color type
    newConfirmBox.setConfig({
      layoutType: type, 
      animationIn: AppearanceAnimation.BOUNCE_IN, 
      animationOut: DisappearanceAnimation.BOUNCE_OUT, 
    });

    // Simply open the popup
    return newConfirmBox.openConfirmBox$();
  }

}