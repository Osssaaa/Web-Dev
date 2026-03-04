import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.scss',
})
export class AlbumDetail implements OnInit {
  album?: Album;
  loading = true;
  error = '';
  success = '';

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
    this.loading = true;
    this.albumService.getAlbum(id).subscribe({
      next: (a) => {
        this.album = a;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load album.';
        this.loading = false;
      },
    });
  }

  save() {
    if (!this.album) return;
    this.albumService.updateAlbum(this.album).subscribe({
      next: (updated) => {
        this.album = updated;
        this.success = 'Album saved successfully.';
        setTimeout(() => (this.success = ''), 3000);
      },
      error: () => {
        this.error = 'Failed to save album.';
      },
    });
  }

  goPhotos() {
    if (this.album) {
      this.router.navigate(['/albums', this.album.id, 'photos']);
    }
  }

  goBack() {
    this.router.navigate(['/albums']);
  }
}
