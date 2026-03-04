import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albums.html',
  styleUrl: './albums.scss',
})
export class Albums implements OnInit {
  albums$!: Observable<Album[]>;
  loading = true;
  error: string | null = null;

  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {
    this.albums$ = this.albumService.getAlbums().pipe(
      finalize(() => (this.loading = false)),
      catchError((err) => {
        this.error = 'Failed to load albums.';
        return of([] as Album[]);
      })
    );
  }

  delete(album: Album) {
    this.albumService.deleteAlbum(album.id).subscribe({
      next: () => {
        this.reloadAlbums();
      },
    });
  }

  goToAlbum(id: number) {
    this.router.navigate(['/albums', id]);
  }

  reloadAlbums() {
    this.loading = true;
    this.albums$ = this.albumService.getAlbums().pipe(
      finalize(() => (this.loading = false)),
      catchError((err) => {
        this.error = 'Failed to load albums.';
        return of([] as Album[]);
      })
    );
  }
}
