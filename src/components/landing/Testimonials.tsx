import Image from 'next/image';

const testimonials = [
  {
    body: 'SurplusConnect has been a game-changer for our bakery. We\'ve significantly reduced our waste and connected with so many new customers. The platform is incredibly easy to use.',
    author: {
      name: 'Sarah Johnson',
      role: 'Owner, The Rolling Pin Bakery',
      imageUrl: '/images/testimonials/sarah-j.jpg',
    },
  },
  {
    body: 'As an NGO, finding consistent food sources is a constant challenge. SurplusConnect has streamlined the process, allowing us to secure more meals for the families we support.',
    author: {
      name: 'David Chen',
      role: 'Director, Community Kitchen Hub',
      imageUrl: '/images/testimonials/david-c.jpg',
    },
  },
  {
    body: 'I love finding amazing food at a great price while also doing something good for the planet. It\'s a win-win! I\'ve discovered so many local gems through this app.',
    author: {
      name: 'Maria Garcia',
      role: 'Happy Customer',
      imageUrl: '/images/testimonials/maria-g.jpg',
    },
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Testimonials</h2>
          <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            What Our Community is Saying
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're honored to have the support of a vibrant community of vendors, consumers, and NGOs who believe in our mission.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.name} className="card p-8">
                <figure>
                  <blockquote className="text-lg leading-7 text-gray-700">
                    <p>“{testimonial.body}”</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        className="object-cover"
                        src={testimonial.author.imageUrl}
                        alt={`Photo of ${testimonial.author.name}`}
                        fill
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-gray-600">{testimonial.author.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    </section>
  );
}