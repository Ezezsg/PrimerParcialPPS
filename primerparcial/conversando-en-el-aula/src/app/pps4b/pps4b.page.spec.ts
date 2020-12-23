import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pps4bPage } from './pps4b.page';

describe('Pps4bPage', () => {
  let component: Pps4bPage;
  let fixture: ComponentFixture<Pps4bPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pps4bPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pps4bPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
