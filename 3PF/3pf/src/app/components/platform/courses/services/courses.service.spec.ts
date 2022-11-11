import { TestBed } from '@angular/core/testing';
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe("CoursesService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CoursesService(httpClientSpy as any);
  });

  describe('Pruebas unitarias 3PF - Servicio', () => {
    it('El servicio se instancia correctamente', () => {
      expect(service).toBeTruthy();
    });

    it('El servicio retorna cada elemente curso con un fecha CreatedAt asignada', (done: DoneFn) => {


      const fakeData =
      [
        {
         "createdAt": "2022-01-22T06:18:59.692Z",
         "name": "Course 2",
         "category": "aut",
         "UpdatedAt": "2022-11-03T02:57:01.770Z",
         "id": "3",
         "updatedAt": "2022-11-03T22:38:38.839Z"
        },
        {
         "createdAt": "2022-04-25T03:56:23.668Z",
         "name": "Lead Interactions Specialist",
         "category": "iusto",
         "UpdatedAt": "2022-11-02T20:19:14.894Z",
         "id": "4"
        },
        {
         "createdAt": "2021-11-17T12:55:45.243Z",
         "name": "Dynamic Configuration Strategist",
         "category": "in",
         "UpdatedAt": "2022-11-02T21:50:26.139Z",
         "id": "5"
        },
        {
         "createdAt": "2021-12-07T05:21:25.889Z",
         "name": "Chief Data Designer",
         "category": "at",
         "UpdatedAt": "2022-11-02T07:47:12.185Z",
         "id": "6"
        },
        {
         "createdAt": "2022-03-06T12:38:48.781Z",
         "name": "Central Mobility Manager",
         "category": "possimus",
         "UpdatedAt": "2022-11-02T18:49:11.856Z",
         "id": "7"
        },
        {
         "createdAt": "2022-02-18T23:12:48.585Z",
         "name": "Product Identity Director",
         "category": "facere",
         "UpdatedAt": "2022-11-02T19:08:04.318Z",
         "id": "8"
        }
       ]

      httpClientSpy.get.and.returnValue(of(fakeData));
      service.getCourses().subscribe((courses) => {
        if (courses.length > 0) {
          courses.forEach((item)=> {
            expect(item.createdAt).toBeTruthy();
          })
          
        }

        done();
      })
    })

  });


});
