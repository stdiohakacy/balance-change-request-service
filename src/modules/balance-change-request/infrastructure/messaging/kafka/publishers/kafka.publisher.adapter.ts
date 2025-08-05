import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { EventPublisherPort } from '@modules/balance-change-request/application/ports/outbound/event-publisher.port';

@Injectable()
export class KafkaPublisherAdapter implements EventPublisherPort {
    private readonly kafka = new Kafka({
        brokers: [process.env.KAFKA_BROKER],
        clientId: 'balance-change-request-service',
    });
    private readonly producer = this.kafka.producer();

    async publish(event: object): Promise<void> {
        await this.producer.connect();
        await this.producer.send({
            topic: 'balance-change-request-events',
            messages: [{ value: JSON.stringify(event) }],
        });
        await this.producer.disconnect();
    }
}
