# Email Gönderimi Kurulum Talimatları

Randevu formundan Gmail'e email göndermek için EmailJS kullanıyoruz. Kurulum adımları:

## 1. EmailJS Hesabı Oluştur

1. https://www.emailjs.com/ adresine git
2. "Sign Up" ile ücretsiz hesap oluştur
3. Email adresinle kayıt ol

## 2. Email Servisini Bağla

1. Dashboard'da "Email Services" sekmesine git
2. "Add New Service" butonuna tıkla
3. "Gmail" seçeneğini seç
4. Gmail hesabınla bağlantı kur (floryadogaveteriner@gmail.com)
5. Service ID'yi kopyala (örn: service_abc123)

## 3. Email Template Oluştur

1. Dashboard'da "Email Templates" sekmesine git
2. "Create New Template" butonuna tıkla
3. Aşağıdaki template'i kullan:

**Subject:**
```
Yeni Randevu - {{owner_name}}
```

**Content:**
```
Yeni randevu talebi alındı:

Müşteri Bilgileri:
- Ad Soyad: {{owner_name}}
- Telefon: {{owner_phone}}

Randevu Detayları:
- Tarih: {{appointment_date}}
- Saat: {{appointment_time}}
- Hekim: {{doctor}}
- Evcil Hayvan: {{pet_type}}
- Hizmet Türü: {{service_type}}

---
Florya Doğa Veteriner Polikliniği
```

4. Template ID'yi kopyala (örn: template_xyz789)

## 4. Public Key Al

1. Dashboard'da "Account" sekmesine git
2. "API Keys" bölümünden Public Key'i kopyala (örn: user_abc123xyz)

## 5. Environment Variables Ayarla

`.env.local` dosyasını aç ve kopyaladığın değerleri yapıştır:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_abc123xyz
```

## 6. Uygulamayı Yeniden Başlat

```bash
npm run dev
```

## Test Et

1. Randevu formunu doldur
2. "Randevu Oluştur" butonuna tıkla
3. Success ekranını gör
4. Gmail hesabını kontrol et - email gelmiş olmalı

## Notlar

- EmailJS ücretsiz planında ayda 200 email gönderebilirsin
- Daha fazla email için ücretli plana geçebilirsin
- Email gönderimi başarısız olursa console'da hata mesajı görünür
- Template'deki değişken isimleri ({{owner_name}} gibi) değiştirme, kod ile eşleşmeli

## Sorun Giderme

**Email gelmiyor:**
- EmailJS dashboard'da "Logs" sekmesinden gönderim durumunu kontrol et
- Gmail spam klasörünü kontrol et
- Service ve Template ID'lerin doğru olduğundan emin ol

**"Invalid public key" hatası:**
- Public Key'in doğru kopyalandığından emin ol
- EmailJS hesabının aktif olduğunu kontrol et

**CORS hatası:**
- EmailJS otomatik olarak domain'i whitelist'e ekler
- localhost için sorun olmamalı
