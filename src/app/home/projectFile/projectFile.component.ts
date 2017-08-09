import { Component } from '@angular/core';
import { slideInDownAnimation } from '../../core/animations/animations'

@Component({
  selector: 'project-file',
  templateUrl: './projectFile.component.html',
  styleUrls: ['./projectFile.component.scss'],
  animations:[slideInDownAnimation]
})
export class ProjectFileComponent {
  title = 'app works!';
}
