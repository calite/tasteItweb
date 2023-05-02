import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsOnUserResponse } from 'src/app/core/interfaces/comment.interface';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent {

  @Output()
  currentUser: UserResponse;
  @Output()
  public comments: CommentsOnUserResponse[] = [];

  @Input()
  public isLoading: boolean = false;

  private token: string;
  public recipesCount = 0;
  public followingCount = 0;
  public followersCount = 0;
  public likesCount = 0;


  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    //this.token = this.currentUser.token;

    this.token = this.route.snapshot.paramMap.get('token');
    this.apiService.getUserByToken(this.token).subscribe(
      response => {
        this.currentUser = response
        this.isLoading = true
      })

  }

  ngOnInit(): void {

    //contadores
    this.apiService.getCountRecipes(this.token)
      .subscribe(response => {
        this.recipesCount = response;
      });

    this.apiService.getCountFollowing(this.token)
      .subscribe(response => {
        this.followingCount = response;
      });

    this.apiService.getCountFollowers(this.token)
      .subscribe(response => {
        this.followersCount = response;
      });

    this.apiService.getCountLikes(this.token)
      .subscribe(response => {
        this.likesCount = response;
      });

    //comentarios
    this.apiService.getCommentsOnUser(this.token)
      .subscribe(response => {
        this.comments = response;
      });

  }


  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

}
