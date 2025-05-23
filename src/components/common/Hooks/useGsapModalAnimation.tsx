import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const useGsapModalAnimation = (
    ref: React.RefObject<HTMLElement>,
    isVisible: boolean,
    onClose?: () => void
) => {
    useGSAP(() => {
        if (isVisible && ref.current) {
            gsap.fromTo(
                ref.current,
                { opacity: 0, y: -40 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, [isVisible, ref]);

    const animateClose = () => {
        if (ref.current) {
            gsap.to(ref.current, {
                opacity: 0,
                y: -40,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    onClose?.(); // call the actual modal.remove()
                },
            });
        } else {
            onClose?.();
        }
    };

    return { animateClose };
};

export default useGsapModalAnimation;
