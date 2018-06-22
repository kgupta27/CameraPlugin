import { NgModule } from '@angular/core';
import { ExperiencePage } from './experience/experience';
import { MediaPage } from './media/media';
import { ProfilePage } from './profile/profile';
import { FamilynFriendsPage } from './familynfriends/familynfriends';

@NgModule({
	declarations: [ExperiencePage,MediaPage,ProfilePage,FamilynFriendsPage],
	imports: [ExperiencePage,MediaPage,ProfilePage,FamilynFriendsPage],
	exports: [ExperiencePage,MediaPage,ProfilePage,FamilynFriendsPage]
})
export class ComponentsModule {}
