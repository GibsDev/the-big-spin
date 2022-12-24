import {useCallback, useContext} from 'react';
import {SocketContext} from './App';

const slices = [
    {
        value: '$250',
        color: '#09f'
    },
    {
        value: '$1000',
        color: '#f00'
    },
    {
        value: 'BANKRUPT',
        color: '#000'
    },
    {
        value: '$700',
        color: '#093'
    },
    {
        value: '$500',
        color: '#09f'
    },
    {
        value: '$800',
        color: '#ff0'
    },
    {
        value: '$300',
        color: '#f00'
    },
    {
        value: '$2000',
        color: '#f0c'
    },
    {
        value: '$500',
        color: '#093'
    },
    {
        value: '$250',
        color: '#f00'
    },
    {
        value: '$350',
        color: '#ff0'
    },
    {
        value: 'LOSE A TURN',
        color: '#fff'
    },
    {
        value: '$200',
        color: '#f90'
    },
    {
        value: '$600',
        color: '#093'
    },
    {
        value: 'BANKRUPT',
        color: '#000'
    },
    {
        value: '$500',
        color: '#f00'
    },
    {
        value: '$200',
        color: '#09f'
    },
    {
        value: '$550',
        color: '#ff0'
    },
    {
        value: '$400',
        color: '#f90'
    },
    {
        value: '$200',
        color: '#093'
    },
    {
        value: '$900',
        color: '#f00'
    },
    {
        value: '$250',
        color: '#ff0'
    },
    {
        value: '$300',
        color: '#f90'
    },
    {
        value: '$900',
        color: '#093'
    }
];

const Spinner = () => {

    const socket = useContext(SocketContext);

    const canvasRef = useCallback(canvas => {
        if (!canvas) return;

        // Setup variables
        let width = 300;
        let height = 150;

        let rotation = 0;
        let spinning = false;

        // Canvas resolution listener
        new ResizeObserver(([e]) => {
            canvas.width = e.contentRect.width;
            canvas.height = e.contentRect.height;
            width = e.contentRect.width;
            height = e.contentRect.height;
            render();
        }).observe(canvas);

        function getCurrentIndex() {
            const ratio = rotation / (Math.PI * 2);
            const index = slices.length - Math.floor(ratio * slices.length);
            return index - 1;
        }

        function getCurrentValue() {
            return slices[getCurrentIndex()].value;
        }

        function render() {
            console.log('rendering');
            const ctx = canvas.getContext('2d');
            const radius = Math.min(width, height) * 0.93 / 2;

            const sectorSize = (Math.PI * 2) / slices.length;

            const defaultLineWidth = radius / 175;
            ctx.lineWidth = defaultLineWidth;
            const fontSize = radius / slices.length * 2;
            ctx.font = 'bold ' + fontSize + 'px Arial';

            const centerX = width / 2;
            const centerY = height / 2;

            // Clear the canvas
            ctx.clearRect(0, 0, width, height);

            let halfSector = sectorSize / 2;

            // Rotates the final canvas by spinners current rotation
            ctx.setTransform(1, 0, 0, 1, centerX, centerY, 0);
            ctx.rotate(rotation + halfSector);

            for (let i = 0; i < slices.length; i++) {
                // Draw basic sector
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, -halfSector, halfSector);
                ctx.closePath();
                ctx.fillStyle = slices[i % slices.length].color;
                ctx.fill();
                ctx.stroke();

                // Determine to draw with black or white text
                const r_hex = parseInt('0x' + ctx.fillStyle.substring(1, 3));
                const g_hex = parseInt('0x' + ctx.fillStyle.substring(3, 5));
                const b_hex = parseInt('0x' + ctx.fillStyle.substring(5, 7));
                const luminosity = 0.21 * r_hex + 0.72 * g_hex + 0.07 * b_hex;
                if (luminosity < 127) {
                    ctx.fillStyle = '#fff';
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 4;
                } else {
                    ctx.fillStyle = '#000';
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 3;
                }

                // Draw text
                const text = slices[i].value;
                const textDimensions = ctx.measureText(text);
                const textWidth = textDimensions.width;
                ctx.strokeText(text, radius - textWidth - fontSize / 3, fontSize / 2 - fontSize / 5);
                ctx.fillText(text, radius - textWidth - fontSize / 3, fontSize / 2 - fontSize / 5);

                // Add highlight to current value
                if (getCurrentIndex() === i) {
                    // Obnoxiously complicated math to achieve an inner stroke
                    ctx.lineJoin = 'miter';
                    const desiredStroke = radius / 100;
                    const y = 0;
                    // Pythagorean a b (c)
                    const a = desiredStroke / 2 + defaultLineWidth / 2;
                    const b = a / Math.tan(halfSector);
                    const x = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = desiredStroke * 1.7;

                    const strokeSlice = () => {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.arc(x, y, radius - x - a, -halfSector, halfSector);
                        ctx.lineTo(x, y);
                        ctx.closePath();
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.arc(x, y, radius / 3 - x + a, -halfSector, halfSector);
                        ctx.lineTo(x, y);
                        ctx.closePath();
                        ctx.stroke();
                    };

                    // Draw black layer of highlight
                    strokeSlice();

                    // Set inner stroke properties
                    ctx.strokeStyle = '#0ff';
                    ctx.lineWidth = desiredStroke;

                    // Draw colored layer of highlight
                    strokeSlice();

                    // Reset the stroke
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = defaultLineWidth;
                }

                // Rotate the canvas for the next sector to be drawn
                ctx.rotate(sectorSize);
                ctx.strokeStyle = '#000';
                ctx.lineWidth = defaultLineWidth;
            }

            // Save so that we can draw static elements over spinner
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            // Draw pointer arrow
            ctx.beginPath();
            const size = radius / 20;
            const pointerX = centerX + radius + 2;
            const pointerY = centerY;
            ctx.moveTo(pointerX, pointerY);
            ctx.lineTo(pointerX + size, pointerY + size / 2);
            ctx.lineTo(pointerX + size, pointerY - size / 2);
            ctx.closePath();
            ctx.fillStyle = '#f09';
            ctx.fill();
            ctx.stroke();

            // Draw center circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius / 3, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = '#888';
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        }

        function spin(initial_velocity, start_time) {
            spinning = true;
            if(!initial_velocity){
                initial_velocity = Math.random() * 0.02 + 0.045;
            }
            if(!start_time){
                start_time = Date.now();
            }
            const delta = Date.now() - start_time;
            const wheel_velocity = initial_velocity - delta * 0.00001;
            let old_index = getCurrentIndex();
            rotation = (rotation + wheel_velocity) % (Math.PI * 2);
            let new_index = getCurrentIndex();

            // TODO fix sound
            // if(old_index !== new_index && this.spinSound !== undefined){
            //     var instance = this.spinSound.cloneNode();
            //     instance.volume = this.volume || 0.5;
            //     instance.play();
            // }

            render();

            if(wheel_velocity > 0){
                requestAnimationFrame(() => {
                    spin(initial_velocity, start_time);
                });
            } else {
                spinning = false;
                // TODO emit spin done
                socket.emit('spin_complete', getCurrentValue());
            }
        }

        // Start spin on message
        socket.on('spin', () => {
            if (!spinning) {
                spin();
            }
        });

        render();
    }, []);

    return <canvas className="spinner" ref={canvasRef} />;
};

export default Spinner;