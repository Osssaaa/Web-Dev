import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-photos.html',
  styleUrl: './album-photos.scss',
})
export class AlbumPhotos implements OnInit {
  photos: Photo[] = [];
  loading = false;
  error = '';
  albumId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error = 'Invalid album id.';
      return;
    }
    this.albumId = id;
    this.loading = true;
    this.albumService.getAlbumPhotos(id).subscribe({
      next: (p) => {
        this.photos = p;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load photos.';
        this.loading = false;
      },
    });
  }

  goBack() {
    if (this.albumId) {
      this.router.navigate(['/albums', this.albumId]);
    }
  }
}
