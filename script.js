document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.round-checkbox');
    const speedboxes = document.querySelectorAll('.speed-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(event) {
            if (this.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
                console.log(this.id);
                if (this.id === 'rounds-5') {
                    rounds = 5;
                }
                if (this.id === 'rounds-10') {
                    rounds = 10;
                }
                if (this.id === 'rounds-unlimited') {
                    rounds = 99999;
                }
                console.log(rounds);
            }
            else{
                event.preventDefault();
                this.checked = true;
            }
        });
    });

    speedboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(event) {
            if (this.checked) {
                speedboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
                console.log(this.id);
                if (this.id === 'normal') {
                    maxTimeout = 3500;
                    minTimeout = 1500;
                }
                if (this.id === 'slow') {
                    maxTimeout = 8500;
                    minTimeout = 1500;
                }
                if (this.id === 'fast') {
                    maxTimeout = 1000;
                    minTimeout = 1000;
                }
                console.log(maxTimeout + " " + minTimeout);
            }
            else{
                event.preventDefault();
                this.checked = true;
            }
        });
    });
});