import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;

    // Valores inputs
    fixture.componentRef.setInput('pokemon', { ...mockPokemon });

    fixture.detectChanges(); // Importante
  });

  it('should create', () => {
    // console.log(fixture.nativeElement.innerHTML);
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon);
  });

  it('should compute the correct pokemon image URL', () => {
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(component.pokemonImage()).toBe(expectedUrl);
  });

  it('should render pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const nameElement = compiled.querySelector('h2');
    const imgElement = compiled.querySelector('img');

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);

    expect(imgElement?.src).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`
    );
    expect(imgElement?.alt).toBe(mockPokemon.name);
  });

  it('should have the correct routeLink configuration', () => {
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink);

    const expectedUrl = `/pokemons/${mockPokemon.name}`;

    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl);
  });
});
