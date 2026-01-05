# YouTube Video Ekleme Kılavuzu

## YouTube Video ID'lerini Nasıl Bulursunuz?

### 1. YouTube Kanalınıza Gidin
https://www.youtube.com/@floryadogaveterinerklinigi

### 2. Video ID'sini Bulun

Bir YouTube videosunun URL'si şu şekildedir:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

Bu örnekte `dQw4w9WgXcQ` video ID'sidir.

### 3. Video ID'lerini Kodda Güncelleyin

`src/App.jsx` dosyasını açın ve şu satırları bulun:

```jsx
src="https://www.youtube.com/embed/VIDEO_ID_1"
```

`VIDEO_ID_1`, `VIDEO_ID_2`, vb. yerine gerçek video ID'lerinizi yazın:

```jsx
src="https://www.youtube.com/embed/dQw4w9WgXcQ"
```

### 4. Örnek Kullanım

Eğer video URL'niz:
```
https://www.youtube.com/watch?v=ABC123xyz
```

ise, kodda şöyle kullanın:
```jsx
<iframe 
  width="100%" 
  height="315" 
  src="https://www.youtube.com/embed/ABC123xyz" 
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen
></iframe>
```

## Kaç Video Göstermek İstersiniz?

Şu anda 4 video gösterilecek şekilde ayarlanmış. 

- **Daha fazla video için**: `<div className="youtube-video">` bloğunu kopyalayıp yapıştırın
- **Daha az video için**: İstemediğiniz `<div className="youtube-video">` bloklarını silin

## Notlar

- YouTube videoları otomatik olarak responsive'dir (mobil uyumlu)
- Videolar iframe ile embed edilir
- İnternet bağlantısı gereklidir
- Videolar YouTube'dan yüklenir

## Sosyal Medya Linkleri

YouTube linki ayrıca:
- İletişim bölümünde sosyal medya linklerinde de eklendi
- Galeri bölümünde "YouTube'da Daha Fazlası" butonu olarak eklendi
