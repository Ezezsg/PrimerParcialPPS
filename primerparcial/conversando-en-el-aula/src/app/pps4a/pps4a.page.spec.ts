import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pps4aPage } from './pps4a.page';

describe('Pps4aPage', () => {
  let component: Pps4aPage;
  let fixture: ComponentFixture<Pps4aPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pps4aPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pps4aPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
