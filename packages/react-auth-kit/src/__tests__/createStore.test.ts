import TokenObject from "../RxTokenObject";
import createStore from "../createStore";
import { AuthError } from "../errors";

describe('Store without refreshtoken', ()=>{
    it('Store creation local store', ()=> {
        const store = createStore({
            authName: '__auth',
            authType: 'localstorage'
        });
        const tokenObject = new TokenObject('__auth', "localstorage", null);
        expect(store.refresh).toBeUndefined();
        expect(store.tokenObject.value).toEqual(tokenObject.value);
        
    });

    it('Store creation cookie', ()=> {
        const store = () => createStore({
            authName: '__auth',
            authType: 'cookie',
            cookieDomain: window.location.hostname,
            cookieSecure: false
        });
        const tokenObject = new TokenObject('__auth', "cookie", null, window.location.hostname, false);
        expect(store).not.toThrow(AuthError);
        expect(store().refresh).toBeUndefined();
        expect(store().tokenObject.value).toEqual(tokenObject.value);
    });
});

describe('createStore Throws error if cookie params not given', ()=>{
    it('cookieDomain and cookieSecure', ()=>{
        const store = () => createStore({
            authName: '__auth',
            authType: 'cookie'
        });
        expect(store).toThrow(AuthError);
    });
    it('cookieSecure', ()=>{
        const store = () => createStore({
            authName: '__auth',
            authType: 'cookie',
            cookieSecure: true
        });
        expect(store).toThrow(AuthError);
    });
    it('cookieDomain', ()=>{
        const store = () => createStore({
            authName: '__auth',
            authType: 'cookie',
            cookieDomain: window.location.hostname
        });
        expect(store).toThrow(AuthError);
    });
})