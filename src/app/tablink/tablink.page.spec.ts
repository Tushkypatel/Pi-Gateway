import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablinkPage } from './tablink.page';

describe('TablinkPage', () => {
  let component: TablinkPage;
  let fixture: ComponentFixture<TablinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablinkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
