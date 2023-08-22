import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { Router } from "@angular/router"
import { MockProvider } from "ng-mocks"
import { AuthService } from "./auth.service"
import { User } from "../dashboard/pages/users/models/user.model"

describe('AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                MockProvider(Router)
            ]
        })
        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    })

    it('If login is valid then the observable authUser$ should emit a value', () => {
        const mockUser: User = {
            id: 1,
            nombre: "Sergio",
            apellido: "Gómez",
            email: "sergio@gmail.com",
            password: "sergio123*",
            token: "aE2PrFqAXLpZY3W0sWo",
            role: "Admin"
        };

        const mockResponse: User[] = [mockUser];
        service.login({
            email: mockUser.email,
            password: mockUser.password
        });
        httpController.expectOne({
            method: 'GET',
            url: `http://localhost:3000/users`
        }).flush(mockResponse);
        service.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
            }
        })
    })

})
