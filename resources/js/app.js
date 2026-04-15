import Alpine from 'alpinejs'

Alpine.data('alert', function () {
  return {
    isVisible: false,
    dismiss() {
      this.isVisible = false
    },
    init() {
      setTimeout(() => {
        this.isVisible = true
      }, 80)
      setTimeout(() => {
        this.dismiss()
      }, 5000)
    },
  }
})

Alpine.data('generateForm', function (voicesByMood) {
  return {
    voicesByMood: voicesByMood || {},
    selectedMood: '',
    selectedVoice: '',
    get availableVoices() {
      return this.voicesByMood[this.selectedMood] || []
    },
    selectMood(mood) {
      this.selectedMood = mood
      this.selectedVoice = ''
    },
  }
})

Alpine.start()
