import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showFullHeader, setShowFullHeader] = useState(false)
  const servicesRef = useRef(null)
  const equipmentRef = useRef(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [petType, setPetType] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false)
  const [step, setStep] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [ownerName, setOwnerName] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const doctors = [
    'Uzm.Vet.Hek. Emre Erdoğan',
    'Uzm.Vet.Hek. Sena Kimya',
    'Vet.Hekim E.Barış Kandemir',
    'Vet.Hekim Kubilay Albayrak',
    'Kuaför'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const templateParams = {
      to_email: 'floryadogaveteriner@gmail.com',
      owner_name: ownerName,
      owner_phone: ownerPhone,
      pet_type: petType === 'kedi' ? 'Kedi' : 'Köpek',
      doctor: selectedDoctor,
      service_type: serviceType === 'muayene' ? 'Muayene' : 'Kuaför',
      appointment_date: new Date(selectedDate).toLocaleDateString('tr-TR'),
      appointment_time: selectedTime
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStep(4)
    } catch (error) {
      console.error('Email gönderme hatası:', error)
      alert('Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const isDateDisabled = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const sections = [
    'hero',
    'about', 
    'vision',
    'clinic',
    'services',
    'equipment',
    'gallery',
    'team',
    'appointment',
    'contact'
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const progress = (scrollPosition / documentHeight) * 100
      
      setScrollProgress(progress)
      setShowFullHeader(scrollPosition > windowHeight * 0.3)
      
      const sections = document.querySelectorAll('.section')
      let currentIndex = 0
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentIndex = index
        }
      })
      setActiveSection(currentIndex)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('.section')
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="app">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Landing Header - Minimal */}
      <nav className={`navbar ${showFullHeader ? 'navbar-full' : 'navbar-minimal'}`}>
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">Florya Doğa</span>
            {!showFullHeader && <span className="logo-subtitle">Veteriner Polikliniği</span>}
          </div>
          
          {/* Full Navigation - Only show after scroll */}
          <div className={`nav-menu ${showFullHeader ? 'nav-menu-visible' : 'nav-menu-hidden'}`}>
            {['Ana Sayfa', 'Hakkımızda', 'Vizyon', 'Klinik', 'Hizmetler', 'Ekipman', 'Galeri', 'Ekip', 'Randevu', 'İletişim'].map((item, index) => (
              <span key={index}>
                <button 
                  className={`nav-link ${activeSection === index ? 'active' : ''}`}
                  onClick={() => scrollToSection(index)}
                >
                  {item}
                </button>
                {index < 9 && <span className="nav-separator">|</span>}
              </span>
            ))}
          </div>

          {/* Contact Info - Only show in minimal mode */}
          {!showFullHeader && (
            <div className="header-contact">
              <span className="contact-phone">0212 662 22 42</span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Full Screen Landing */}
      <section className="section hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">
              Florya Doğa<br/>
              <span className="title-accent">Veteriner Polikliniği</span>
            </h1>
            <p className="hero-subtitle">
              Küçük dostlarınıza en iyi hizmeti sunuyoruz.<br/>
              2013'ten bu yana sevgi ve saygıyla hizmet veriyoruz.
            </p>
            <div className="hero-actions">
              <button className="action-link primary" onClick={() => scrollToSection(8)}>Randevu Al</button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">7/24</span>
              <span className="stat-label">Hizmet</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Sevgi</span>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-text">Aşağı kaydırın</div>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="section-content">
          <div className="content-grid">
            <div className="content-text">
              <h2 className="section-title">Hakkımızda</h2>
              <p className="section-description">
                Her hasta, yalnızca bir vaka değil; bizim için bir aile üyesidir.
              </p>
              <p className="section-description" style={{marginTop: '2rem'}}>
                Sevginin var olduğu her yeri güzelleştireceği inancıyla her gün "katlanan sevgiyle" 
                ve canlıya duyulan "saygıyla" 2013'ten bu yana sever adım ilerliyoruz.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-content">
                    <span className="feature-title">İleri Teknoloji</span>
                    <span className="feature-text">Son teknoloji cihazlarla donatılmış tanı ve tedavi ünitelerimizde; ultrasonografi, laboratuvar analizleri ve görüntüleme sistemleriyle doğru tanıyı en kısa sürede koyuyoruz.</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-content">
                    <span className="feature-title">Uzman Kadro</span>
                    <span className="feature-text">Alanında deneyimli veteriner hekimlerimiz ve teknik ekibimiz, sürekli eğitimlerle kendini geliştiren bir yapının parçasıdır. Her biri, sevgiyle ve bilimle hizmet verir.</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-content">
                    <span className="feature-title">Hijyen ve Güven</span>
                    <span className="feature-text">Kliniğimizde hijyen standartları, uluslararası protokollere göre titizlikle uygulanır. Steril muayene alanlarımız ve yoğun bakım ünitelerimiz, dostlarımız için maksimum güvenliği sağlar.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-visual">
              <div className="visual-element">
                <div className="visual-text">Başarı ve Güvenilirlik</div>
                <div className="visual-subtext">Yıllardır binlerce hastada elde ettiğimiz yüksek başarı oranı, bizi sadece bir klinik değil, güvenin adresi haline getirdi.</div>
                <div className="clinic-motto">
                  <div className="motto-title">Florya Doğa Veteriner Polikliniği</div>
                  <div className="motto-text">"Bilimle, sevgiyle, güvenle…"</div>
                  <div className="motto-desc">Her adımda sağlığı, konforu ve güveni ön planda tutuyoruz</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section vision-section">
        <div className="section-content">
          <div className="vision-layout">
            <div className="vision-main">
              <h2 className="section-title">Vizyonumuz</h2>
              <p className="vision-text">
                Sevginin var olduğu her yeri güzelleştireceği inancıyla, canlıya duyulan 
                saygı ve sevgiyle dostlarımızın yaşam kalitesini en üst seviyeye çıkarmak.
              </p>
              <p className="vision-text" style={{marginTop: '2rem', fontSize: '1.1rem', fontStyle: 'italic'}}>
                "Sevgi, mutluluk paylaştıkça çoğalır, sevginizi mutluluğunuzu paylaşıyoruz."
              </p>
              <p className="vision-text" style={{marginTop: '2rem', fontSize: '1rem', color: 'var(--accent)', fontWeight: '400'}}>
                Her hasta, yalnızca bir vaka değil; bizim için bir aile üyesidir.
              </p>
            </div>
            <div className="vision-values">
              <div className="value-item">
                <span className="value-icon">◦</span>
                <span className="value-text">Sevgi ve özen</span>
              </div>
              <div className="value-item">
                <span className="value-icon">◦</span>
                <span className="value-text">Canlıya saygı</span>
              </div>
              <div className="value-item">
                <span className="value-icon">◦</span>
                <span className="value-text">Yaşam kalitesi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Section */}
      <section className="section clinic-section">
        <div className="section-content">
          <h2 className="section-title">Polikliniğimiz</h2>
          <div className="clinic-grid">
            <div className="clinic-info">
              <p className="clinic-description">
                Şenlikköy Mahallesi'nde modern mimarisi ve steril ortamı ile 
                hizmet veren polikliniğimiz, evcil dostlarınız için en konforlu 
                tedavi ortamını sunmaktadır.
              </p>
            </div>
            <div className="clinic-features">
              <div className="clinic-feature">
                <span className="feature-name">Ameliyathane</span>
                <span className="feature-desc">Steril cerrahi ortam</span>
              </div>
              <div className="clinic-feature">
                <span className="feature-name">Laboratuvar</span>
                <span className="feature-desc">Hızlı tanı imkanları</span>
              </div>
              <div className="clinic-feature">
                <span className="feature-name">Röntgen Ünitesi</span>
                <span className="feature-desc">Görüntüleme sistemi</span>
              </div>
              <div className="clinic-feature">
                <span className="feature-name">Yatar Hasta</span>
                <span className="feature-desc">24 saat bakım</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Horizontal Scroll */}
      <section className="section services-section">
        <div className="section-content">
          <h2 className="section-title">Hizmetlerimiz</h2>
          <div className="services-container" ref={servicesRef}>
            <div className="service-item">
              <div className="service-header">
                <h3 className="service-name">Muayene</h3>
                <span className="service-code">01</span>
              </div>
              <p className="service-desc">
                Genel sağlık kontrolü ve tanı hizmetleri
              </p>
              <div className="service-details">
                <span>Genel muayene</span>
                <span>Sağlık kontrolü</span>
                <span>Tanı ve tedavi</span>
              </div>
            </div>

            <div className="service-item">
              <div className="service-header">
                <h3 className="service-name">Aşı Uygulaması</h3>
                <span className="service-code">02</span>
              </div>
              <p className="service-desc">
                Koruyucu aşı programları ve düzenli takip
              </p>
              <div className="service-details">
                <span>Temel aşılar</span>
                <span>Aşı takvimi</span>
                <span>Koruyucu program</span>
              </div>
            </div>

            <div className="service-item">
              <div className="service-header">
                <h3 className="service-name">Cerrahi Operasyonlar</h3>
                <span className="service-code">03</span>
              </div>
              <p className="service-desc">
                Modern ameliyathane ve deneyimli cerrahlar
              </p>
              <div className="service-details">
                <span>Kısırlaştırma</span>
                <span>Genel cerrahi</span>
                <span>Acil operasyonlar</span>
              </div>
            </div>

            <div className="service-item">
              <div className="service-header">
                <h3 className="service-name">Diş Ünitesi</h3>
                <span className="service-code">04</span>
              </div>
              <p className="service-desc">
                Ağız ve diş sağlığı uzman hizmetleri
              </p>
              <div className="service-details">
                <span>Diş temizliği</span>
                <span>Diş çekimi</span>
                <span>Ağız bakımı</span>
              </div>
            </div>

            <div className="service-item">
              <div className="service-header">
                <h3 className="service-name">Göz Ünitesi</h3>
                <span className="service-code">05</span>
              </div>
              <p className="service-desc">
                Göz hastalıkları tanı ve tedavi
              </p>
              <div className="service-details">
                <span>Göz muayenesi</span>
                <span>Göz hastalıkları</span>
                <span>Tedavi programı</span>
              </div>
            </div>

            <div className="service-item">
              <div className="service-header">
                <h3 className="service-name">Mikroçip</h3>
                <span className="service-code">06</span>
              </div>
              <p className="service-desc">
                Mikroçip uygulaması ve kayıt işlemleri
              </p>
              <div className="service-details">
                <span>Mikroçip takma</span>
                <span>Kayıt işlemleri</span>
                <span>Kimlik belgesi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section - Horizontal Scroll */}
      <section className="section equipment-section">
        <div className="section-content">
          <h2 className="section-title">Ekipmanlarımız</h2>
          <div className="equipment-container" ref={equipmentRef}>
            <div className="equipment-item">
              <div className="equipment-name">Röntgen Ünitesi</div>
              <div className="equipment-desc">Modern görüntüleme sistemi ile kesin tanı</div>
            </div>
            <div className="equipment-item">
              <div className="equipment-name">Laboratuvar</div>
              <div className="equipment-desc">Hızlı kan tahlili ve biyokimya testleri</div>
            </div>
            <div className="equipment-item">
              <div className="equipment-name">Diş Ünitesi</div>
              <div className="equipment-desc">Profesyonel diş bakım ekipmanları</div>
            </div>
            <div className="equipment-item">
              <div className="equipment-name">Göz Ünitesi</div>
              <div className="equipment-desc">Göz hastalıkları tanı cihazları</div>
            </div>
            <div className="equipment-item">
              <div className="equipment-name">Cerrahi Ekipmanlar</div>
              <div className="equipment-desc">Modern ameliyathane donanımları</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Instagram Feed */}
      <section className="section gallery-section">
        <div className="section-content">
          <h2 className="section-title">Galeri</h2>
          <p className="section-subtitle">Instagram'dan son paylaşımlarımız</p>
          <div className="instagram-gallery">
            <div className="instagram-post">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/p/DQUnqqogLuO/"
                data-instgrm-version="14"
              ></blockquote>
            </div>
            <div className="instagram-post">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/p/DSH0tHKCIN0/"
                data-instgrm-version="14"
              ></blockquote>
            </div>
            <div className="instagram-post">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/p/DN3YuSV0Pcw/"
                data-instgrm-version="14"
              ></blockquote>
            </div>
            <div className="instagram-post">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/p/DSCvJvGCB0f/"
                data-instgrm-version="14"
              ></blockquote>
            </div>
          </div>
          <div className="instagram-link">
            <a href="https://www.instagram.com/florya_doga_vet_poliklinigi/" target="_blank" rel="noopener noreferrer" className="instagram-btn">
              <span className="instagram-icon">📷</span>
              <span>Instagram'da Daha Fazlası</span>
            </a>
          </div>

          <h3 className="section-subtitle" style={{marginTop: '6rem', marginBottom: '2rem'}}>YouTube'dan videolarımız</h3>
          <div className="youtube-gallery">
            <div className="youtube-video">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/pcc7hTeLBGk" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="youtube-video">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/hG-9WFdQRhQ" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="youtube-video">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/r8OgtfZe0bc" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="youtube-video">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/lE048nYmhCA" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="youtube-link">
            <a href="https://www.youtube.com/@floryadogaveterinerklinigi" target="_blank" rel="noopener noreferrer" className="youtube-btn">
              <span className="youtube-icon">🎥</span>
              <span>YouTube'da Daha Fazlası</span>
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="section-content">
          <h2 className="section-title">Ekibimiz</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-info">
                <h3 className="member-name">Uzm.Vet.Hek. Emre Erdoğan</h3>
                <p className="member-title">İç Hastalıklar Uzmanı</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-info">
                <h3 className="member-name">Uzm.Vet.Hek. Sena Kimya</h3>
                <p className="member-title">İç Hastalıklar Uzmanı</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-info">
                <h3 className="member-name">Vet.Hekim E.Barış Kandemir</h3>
                <p className="member-title">Veteriner Hekim</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-info">
                <h3 className="member-name">Vet.Hekim Kubilay Albayrak</h3>
                <p className="member-title">Veteriner Hekim</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="section appointment-section">
        <div className="section-content">
          <h2 className="section-title">Randevu Al</h2>
          <div className="appointment-container">
            <div className="appointment-form">
              {step === 1 && (
                <div className="form-step">
                  <h3 className="step-title">Tarih Seçin</h3>
                  <div className="calendar-widget">
                    <div className="calendar-header">
                      <button 
                        type="button"
                        className="calendar-nav-btn"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      >
                        ‹
                      </button>
                      <div className="calendar-month">
                        {currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                      </div>
                      <button 
                        type="button"
                        className="calendar-nav-btn"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      >
                        ›
                      </button>
                    </div>
                    <div className="calendar-weekdays">
                      {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map(day => (
                        <div key={day} className="calendar-weekday">{day}</div>
                      ))}
                    </div>
                    <div className="calendar-days">
                      {(() => {
                        const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
                        const days = []
                        
                        for (let i = 0; i < startingDayOfWeek; i++) {
                          days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
                        }
                        
                        for (let day = 1; day <= daysInMonth; day++) {
                          const date = new Date(year, month, day)
                          const dateStr = date.toISOString().split('T')[0]
                          const disabled = isDateDisabled(date)
                          
                          days.push(
                            <button
                              key={day}
                              type="button"
                              className={`calendar-day ${disabled ? 'disabled' : ''} ${selectedDate === dateStr ? 'selected' : ''}`}
                              disabled={disabled}
                              onClick={() => {
                                setSelectedDate(dateStr)
                                setStep(2)
                              }}
                            >
                              {day}
                            </button>
                          )
                        }
                        
                        return days
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h3 className="step-title">Saat Seçin</h3>
                  <div className="time-grid">
                    {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                      <button
                        key={time}
                        type="button"
                        className="time-btn"
                        onClick={() => {
                          setSelectedTime(time)
                          setStep(3)
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="form-navigation">
                    <button type="button" className="nav-btn" onClick={() => setStep(1)}>← Geri</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-step">
                  <div className="form-content">
                    <div className="form-group">
                      <label className="form-label">Hekim Seçimi</label>
                      <div className="custom-select">
                        <div 
                          className="select-trigger"
                          onClick={() => setShowDoctorDropdown(!showDoctorDropdown)}
                        >
                          {selectedDoctor || 'Hekim seçiniz'}
                          <span className="select-arrow">›</span>
                        </div>
                        {showDoctorDropdown && (
                          <div className="select-dropdown">
                            {doctors.map((doctor, index) => (
                              <div
                                key={index}
                                className="select-option"
                                onClick={() => {
                                  setSelectedDoctor(doctor)
                                  setShowDoctorDropdown(false)
                                }}
                              >
                                {doctor}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Evcil Hayvan Türü</label>
                      <div className="pet-type-buttons">
                        <button 
                          type="button"
                          className={`pet-btn ${petType === 'kedi' ? 'active' : ''}`}
                          onClick={() => setPetType('kedi')}
                        >
                          🐱 Kedi
                        </button>
                        <button 
                          type="button"
                          className={`pet-btn ${petType === 'kopek' ? 'active' : ''}`}
                          onClick={() => setPetType('kopek')}
                        >
                          🐶 Köpek
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Ad Soyad</label>
                      <input 
                        type="text" 
                        className="form-input"
                        placeholder="Adınız ve soyadınız"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Telefon Numarası</label>
                      <input 
                        type="tel" 
                        className="form-input"
                        placeholder="0555 555 55 55"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Hizmet Türü</label>
                      <div className="pet-type-buttons">
                        <button 
                          type="button"
                          className={`pet-btn ${serviceType === 'muayene' ? 'active' : ''} ${selectedDoctor === 'Kuaför' ? 'disabled' : ''}`}
                          onClick={() => selectedDoctor !== 'Kuaför' && setServiceType('muayene')}
                          disabled={selectedDoctor === 'Kuaför'}
                        >
                          🩺 Muayene
                        </button>
                        <button 
                          type="button"
                          className={`pet-btn ${serviceType === 'kuafor' ? 'active' : ''} ${selectedDoctor && selectedDoctor !== 'Kuaför' ? 'disabled' : ''}`}
                          onClick={() => (selectedDoctor === 'Kuaför' || !selectedDoctor) && setServiceType('kuafor')}
                          disabled={selectedDoctor && selectedDoctor !== 'Kuaför'}
                        >
                          ✂️ Kuaför
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-navigation">
                    <button type="button" className="nav-btn" onClick={() => setStep(2)}>← Geri</button>
                    <button 
                      type="button" 
                      className="submit-btn"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !ownerName || !ownerPhone || !petType || !selectedDoctor || !serviceType}
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Randevu Oluştur'}
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="form-step success-step">
                  <div className="success-icon">✓</div>
                  <h3 className="success-title">Randevunuz Alındı!</h3>
                  <div className="success-details">
                    <p>Randevu bilgileriniz mail adresinize gönderildi.</p>
                    <div className="appointment-summary">
                      <div className="summary-item">
                        <span className="summary-label">Tarih:</span>
                        <span className="summary-value">{new Date(selectedDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Saat:</span>
                        <span className="summary-value">{selectedTime}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Hekim:</span>
                        <span className="summary-value">{selectedDoctor}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Hizmet:</span>
                        <span className="summary-value">{serviceType === 'muayene' ? 'Muayene' : 'Kuaför'}</span>
                      </div>
                    </div>
                    <p className="success-note">En kısa sürede sizinle iletişime geçeceğiz.</p>
                  </div>
                  <button 
                    type="button" 
                    className="submit-btn"
                    onClick={() => {
                      setStep(1)
                      setSelectedDate('')
                      setSelectedTime('')
                      setPetType('')
                      setServiceType('')
                      setSelectedDoctor('')
                      setOwnerName('')
                      setOwnerPhone('')
                    }}
                  >
                    Yeni Randevu Al
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="section-content">
          <div className="contact-layout">
            <div className="contact-info">
              <h2 className="section-title">İletişim</h2>
              <div className="contact-details">
                <div className="contact-group">
                  <span className="contact-label">Adres</span>
                  <span className="contact-value">
                    Şenlikköy Mah. Florya Cad. No:52/A<br/>
                    Bakırköy / İstanbul / TÜRKİYE
                  </span>
                </div>
                <div className="contact-group">
                  <span className="contact-label">Telefon</span>
                  <span className="contact-value">
                    Tel: 0212 662 22 42<br/>
                    Gsm: 0549 662 22 42
                  </span>
                </div>
                <div className="contact-group">
                  <span className="contact-label">E-posta</span>
                  <span className="contact-value">
                    floryadogaveteriner@gmail.com
                  </span>
                </div>
                <div className="contact-group">
                  <span className="contact-label">Sosyal Medya</span>
                  <div className="social-links">
                    <a href="https://www.facebook.com/profile.php?id=100064091016758" target="_blank" rel="noopener noreferrer" className="social-link">
                      Facebook
                    </a>
                    <a href="https://www.instagram.com/florya_doga_vet_poliklinigi/" target="_blank" rel="noopener noreferrer" className="social-link">
                      Instagram
                    </a>
                    <a href="https://www.youtube.com/@floryadogaveterinerklinigi" target="_blank" rel="noopener noreferrer" className="social-link">
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-map">
              <iframe 
                width="100%" 
                height="450" 
                style={{border:0, borderRadius: '10px'}} 
                loading="lazy" 
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.686!2d28.7945089!3d40.9818774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa3b998b5b71b%3A0xe28a88850b1b86e4!2sFlorya%20Do%C4%9Fa%20Veteriner%20Poliklini%C4%9Fi!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App