# Instagram Embed Kurulumu

## Instagram Postlarını Nasıl Eklerim?

Sitenizde Instagram postlarınızı göstermek için aşağıdaki adımları izleyin:

### 1. Instagram Post URL'lerini Bulun

1. Instagram hesabınıza gidin: https://www.instagram.com/florya_doga_vet_poliklinigi/
2. Göstermek istediğiniz bir posta tıklayın
3. Tarayıcınızın adres çubuğundan URL'yi kopyalayın
   - Örnek: `https://www.instagram.com/p/ABC123xyz/`

### 2. URL'leri Kodda Güncelleyin

`src/App.jsx` dosyasını açın ve aşağıdaki satırları bulun:

```jsx
<InstagramEmbed 
  url="https://www.instagram.com/p/EXAMPLE1/" 
  width="100%"
/>
```

`EXAMPLE1`, `EXAMPLE2`, vb. yerine gerçek Instagram post URL'lerinizi yazın:

```jsx
<InstagramEmbed 
  url="https://www.instagram.com/p/ABC123xyz/" 
  width="100%"
/>
```

### 3. Kaç Post Göstermek İstersiniz?

Şu anda 6 post gösterilecek şekilde ayarlanmış. Daha fazla veya daha az post göstermek için:

- **Daha fazla post için**: `<div className="instagram-post">` bloğunu kopyalayıp yapıştırın
- **Daha az post için**: İstemediğiniz `<div className="instagram-post">` bloklarını silin

### 4. Örnek Kullanım

```jsx
<div className="instagram-gallery">
  <div className="instagram-post">
    <InstagramEmbed 
      url="https://www.instagram.com/p/ABC123xyz/" 
      width="100%"
    />
  </div>
  <div className="instagram-post">
    <InstagramEmbed 
      url="https://www.instagram.com/p/DEF456abc/" 
      width="100%"
    />
  </div>
  {/* Daha fazla post ekleyin... */}
</div>
```

## Notlar

- Instagram embed'leri otomatik olarak responsive'dir (mobil uyumlu)
- Her post yüklenirken Instagram'ın resmi embed widget'ı kullanılır
- Postlar gerçek zamanlı olarak Instagram'dan yüklenir
- İnternet bağlantısı gereklidir

## Sorun Giderme

Eğer postlar görünmüyorsa:

1. Instagram post URL'lerinin doğru olduğundan emin olun
2. Postların herkese açık (public) olduğundan emin olun
3. Tarayıcı konsolunu kontrol edin (F12 tuşu)
4. Sayfayı yenileyin (Ctrl+R veya Cmd+R)
