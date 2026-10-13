$files = @('index.html','work.html','services.html','about.html','contact.html')

$replacements = [ordered]@{
  # Navigation & CTA
  '>Work</a>'            = '>Portfolio</a>'
  '>About</a>'           = '>À propos</a>'
  'Start a project'      = 'Démarrer un projet'
  'Start a conversation' = 'Commencer la conversation'

  # Hero / intro
  'Photography &amp; Visual Stories' = 'Photographie &amp; récits visuels'
  '<span class="label">Scroll</span>' = '<span class="label">Défiler</span>'
  'Selected work'        = 'Portfolio sélectionné'
  'Have a story in mind?' = 'Une histoire en tête ?'
  'Tell us what you want<br /><em>to reveal.</em>' = 'Dites-nous ce que vous voulez<br /><em>révéler.</em>'
  'Tell us what you want to reveal. Une conversation suffit pour' = 'Dites-nous ce que vous voulez révéler. Une conversation suffit pour'

  # Phrases de cartes
  'The person behind the pose.' = 'La personne derrière la pose.'

  # Phrases de services
  'For people with something to express.' = 'Pour celles et ceux qui ont quelque chose à exprimer.'
  'For moments that should never feel ordinary.' = "Pour les instants qui ne doivent jamais être ordinaires."
  'For businesses that want to be remembered.' = 'Pour les marques qui veulent être retenues.'

  # Process
  'More than a shoot.<br /><em>A visual experience.</em>' = "Plus qu'une séance.<br /><em>Une expérience visuelle.</em>"
  '>Understand</h3>' = '>Comprendre</h3>'
  '>Create</h3>'     = '>Créer</h3>'
  '>Reveal</h3>'     = '>Révéler</h3>'

  # Titres de page
  '<title>Work — Reflet Studios</title>'  = '<title>Portfolio — Reflet Studios</title>'
  '<title>About — Reflet Studios</title>' = '<title>À propos — Reflet Studios</title>'

  # Label About
  '<p class="label">About</p>' = '<p class="label">À propos</p>'
}

foreach ($f in $files) {
  $path = Join-Path (Get-Location) $f
  $content = Get-Content $path -Raw -Encoding UTF8
  foreach ($k in $replacements.Keys) {
    $content = $content.Replace($k, $replacements[$k])
  }
  Set-Content -Path $path -Value $content -Encoding UTF8 -NoNewline
  Write-Host "Traité : $f"
}
Write-Host "Terminé."
